package com.athly.backend.security;

import com.athly.backend.config.FirebaseConfig;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Principal;

/**
 * Servlet filter that intercepts inbound HTTP requests, extracts Firebase ID tokens
 * from the Authorization header, verifies them server-side via the Firebase Admin SDK,
 * and wraps the request with an authenticated User Principal.
 *
 * Security Model:
 * 1. Health check (/api/health) and CORS preflights (OPTIONS) bypass authentication.
 * 2. When 'Authorization: Bearer <token>' is present:
 *    - Cryptographically verified against Firebase public keys.
 *    - On failure (expired, forged, malformed), returns immediate HTTP 401.
 *    - On success, wraps HttpServletRequest with verified UID principal.
 * 3. When token is omitted:
 *    - Allows request to proceed. Protected endpoints (e.g. /api/profile/me)
 *      fail closed with HTTP 401 unless athly.dev.auth-mock-enabled is true.
 */
@Component
public class FirebaseAuthFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseAuthFilter.class);

    private final FirebaseConfig firebaseConfig;

    @Value("${athly.dev.auth-mock-enabled:false}")
    private boolean devAuthMockEnabled;

    public FirebaseAuthFilter(FirebaseConfig firebaseConfig) {
        this.firebaseConfig = firebaseConfig;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Public health endpoint bypass
        if (path.equals("/api/health") || path.startsWith("/api/health/")) {
            return true;
        }
        // CORS preflight requests bypass
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        return false;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // 1. Bearer token provided in header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7).trim();

            if (token.isEmpty()) {
                sendUnauthorizedResponse(response, "Bearer token cannot be empty.");
                return;
            }

            // Case A: Firebase Admin SDK is initialized -> Verify token cryptographically
            if (firebaseConfig.isInitialized()) {
                try {
                    FirebaseToken decodedToken = firebaseConfig.getFirebaseAuth().verifyIdToken(token);
                    String uid = decodedToken.getUid();
                    String email = decodedToken.getEmail();

                    AuthenticatedUserRequestWrapper wrappedRequest =
                            new AuthenticatedUserRequestWrapper(request, uid, email, decodedToken);

                    filterChain.doFilter(wrappedRequest, response);
                    return;
                } catch (FirebaseAuthException ex) {
                    logger.warn("[ATHLY SECURITY] Firebase token verification failed: {}", ex.getMessage());
                    sendUnauthorizedResponse(response, "Invalid or expired Firebase ID token: " + ex.getMessage());
                    return;
                } catch (Exception ex) {
                    logger.error("[ATHLY SECURITY] Unexpected error during token verification: {}", ex.getMessage());
                    sendUnauthorizedResponse(response, "Token verification failed: " + ex.getMessage());
                    return;
                }
            }
            // Case B: Firebase Admin SDK not initialized, but dev mock mode explicitly active
            else if (devAuthMockEnabled && ("mock-dev-token".equals(token) || token.startsWith("mock-"))) {
                logger.debug("[ATHLY SECURITY] Dev mock token accepted under development mode.");
                AuthenticatedUserRequestWrapper wrappedRequest =
                        new AuthenticatedUserRequestWrapper(request, "dev-local-user", "dev@athly.local", null);
                filterChain.doFilter(wrappedRequest, response);
                return;
            }
            // Case C: Firebase Admin SDK not initialized and dev mock disabled
            else {
                logger.warn("[ATHLY SECURITY] Bearer token received, but Firebase Admin SDK is unconfigured and dev mock is disabled.");
                sendUnauthorizedResponse(response, "Authentication verification service unavailable. Firebase Admin is not configured.");
                return;
            }
        }

        // 2. No Bearer token provided: allow down chain
        // Protected endpoints check request.getUserPrincipal() and fail closed if unauthenticated
        filterChain.doFilter(request, response);
    }

    private void sendUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String safeMessage = message.replace("\"", "\\\"");
        String body = String.format("{\"error\":\"Unauthorized\",\"message\":\"%s\"}", safeMessage);
        response.getWriter().write(body);
        response.getWriter().flush();
    }

    /**
     * Request wrapper that supplies the verified Firebase UID as user Principal.
     */
    public static class AuthenticatedUserRequestWrapper extends HttpServletRequestWrapper {
        private final String uid;
        private final String email;
        private final Principal principal;

        public AuthenticatedUserRequestWrapper(HttpServletRequest request, String uid, String email, Object token) {
            super(request);
            this.uid = uid;
            this.email = email;
            this.principal = () -> uid;
            setAttribute("firebaseUid", uid);
            setAttribute("firebaseEmail", email);
            if (token != null) {
                setAttribute("firebaseToken", token);
            }
        }

        @Override
        public Principal getUserPrincipal() {
            return principal;
        }

        @Override
        public String getRemoteUser() {
            return uid;
        }

        public String getEmail() {
            return email;
        }
    }
}
