package com.athly.backend;

import com.athly.backend.config.FirebaseConfig;
import com.athly.backend.security.FirebaseAuthFilter;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Unit tests for FirebaseAuthFilter
 * Validates token parsing, cryptographic verification delegation,
 * principal wrapper injection, and fail-closed security behaviors.
 */
class FirebaseAuthFilterTest {

    private FirebaseConfig firebaseConfig;
    private FirebaseAuth firebaseAuth;
    private FirebaseAuthFilter filter;

    @BeforeEach
    void setUp() {
        firebaseConfig = mock(FirebaseConfig.class);
        firebaseAuth = mock(FirebaseAuth.class);
        filter = new FirebaseAuthFilter(firebaseConfig);
    }

    @Test
    @DisplayName("Health endpoint /api/health bypasses token verification")
    void healthEndpointBypassesFilter() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/health");
        // Reflection test on protected shouldNotFilter method
        boolean shouldNotFilter = (boolean) ReflectionTestUtils.invokeMethod(filter, "shouldNotFilter", request);
        assertTrue(shouldNotFilter, "Health check must bypass authentication filtering");
    }

    @Test
    @DisplayName("CORS preflight OPTIONS requests bypass token verification")
    void optionsRequestBypassesFilter() {
        MockHttpServletRequest request = new MockHttpServletRequest("OPTIONS", "/api/profile/me");
        boolean shouldNotFilter = (boolean) ReflectionTestUtils.invokeMethod(filter, "shouldNotFilter", request);
        assertTrue(shouldNotFilter, "OPTIONS preflights must bypass authentication filtering");
    }

    @Test
    @DisplayName("Request without Authorization header passes down filter chain unauthenticated")
    void requestWithoutAuthHeaderPassesThrough() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain filterChain = new MockFilterChain();

        filter.doFilter(request, response, filterChain);

        // Chain is called with original request
        assertEquals(HttpServletResponse.SC_OK, response.getStatus());
        assertNull(filterChain.getRequest().getAttribute("firebaseUid"));
    }

    @Test
    @DisplayName("Empty Bearer token returns 401 Unauthorized")
    void emptyBearerTokenReturns401() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        request.addHeader("Authorization", "Bearer ");
        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain filterChain = mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());
        assertTrue(response.getContentAsString().contains("Bearer token cannot be empty"));
        verify(filterChain, never()).doFilter(any(), any());
    }

    @Test
    @DisplayName("Valid Firebase ID token wraps request with verified UID principal")
    void validTokenWrapsRequestWithPrincipal() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        request.addHeader("Authorization", "Bearer valid-firebase-token-xyz");
        MockHttpServletResponse response = new MockHttpServletResponse();

        FirebaseToken decodedToken = mock(FirebaseToken.class);
        when(decodedToken.getUid()).thenReturn("firebase-member-456");
        when(decodedToken.getEmail()).thenReturn("athlete@athly.luxury");

        when(firebaseConfig.isInitialized()).thenReturn(true);
        when(firebaseConfig.getFirebaseAuth()).thenReturn(firebaseAuth);
        when(firebaseAuth.verifyIdToken("valid-firebase-token-xyz")).thenReturn(decodedToken);

        FilterChain filterChain = mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        ArgumentCaptor<ServletRequest> captor = ArgumentCaptor.forClass(ServletRequest.class);
        verify(filterChain).doFilter(captor.capture(), eq(response));

        HttpServletRequest wrapped = (HttpServletRequest) captor.getValue();
        assertNotNull(wrapped.getUserPrincipal(), "Principal must be set on authenticated request");
        assertEquals("firebase-member-456", wrapped.getUserPrincipal().getName());
        assertEquals("firebase-member-456", wrapped.getAttribute("firebaseUid"));
        assertEquals("athlete@athly.luxury", wrapped.getAttribute("firebaseEmail"));
    }

    @Test
    @DisplayName("Expired or invalid Firebase ID token returns 401 Unauthorized")
    void invalidTokenReturns401() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        request.addHeader("Authorization", "Bearer expired-token-abc");
        MockHttpServletResponse response = new MockHttpServletResponse();

        when(firebaseConfig.isInitialized()).thenReturn(true);
        when(firebaseConfig.getFirebaseAuth()).thenReturn(firebaseAuth);

        FirebaseAuthException authEx = mock(FirebaseAuthException.class);
        when(authEx.getMessage()).thenReturn("Firebase ID token has expired");
        when(firebaseAuth.verifyIdToken("expired-token-abc")).thenThrow(authEx);

        FilterChain filterChain = mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());
        assertTrue(response.getContentAsString().contains("Invalid or expired Firebase ID token"));
        verify(filterChain, never()).doFilter(any(), any());
    }

    @Test
    @DisplayName("Mock dev token accepted when athly.dev.auth-mock-enabled is true")
    void mockDevTokenAcceptedWhenDevModeActive() throws Exception {
        ReflectionTestUtils.setField(filter, "devAuthMockEnabled", true);
        when(firebaseConfig.isInitialized()).thenReturn(false);

        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        request.addHeader("Authorization", "Bearer mock-dev-token");
        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain filterChain = mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        ArgumentCaptor<ServletRequest> captor = ArgumentCaptor.forClass(ServletRequest.class);
        verify(filterChain).doFilter(captor.capture(), eq(response));

        HttpServletRequest wrapped = (HttpServletRequest) captor.getValue();
        assertNotNull(wrapped.getUserPrincipal());
        assertEquals("dev-local-user", wrapped.getUserPrincipal().getName());
    }

    @Test
    @DisplayName("Unconfigured Firebase with dev mock disabled fails closed with 401")
    void unconfiguredFirebaseFailsClosedWith401() throws Exception {
        ReflectionTestUtils.setField(filter, "devAuthMockEnabled", false);
        when(firebaseConfig.isInitialized()).thenReturn(false);

        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/profile/me");
        request.addHeader("Authorization", "Bearer mock-dev-token");
        MockHttpServletResponse response = new MockHttpServletResponse();

        FilterChain filterChain = mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus());
        assertTrue(response.getContentAsString().contains("Firebase Admin is not configured"));
        verify(filterChain, never()).doFilter(any(), any());
    }
}
