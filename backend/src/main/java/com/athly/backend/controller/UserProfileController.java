package com.athly.backend.controller;

import com.athly.backend.dto.UserProfileDto;
import com.athly.backend.exception.ResourceNotFoundException;
import com.athly.backend.service.UserProfileService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for User Profile management endpoints.
 * Base path: /api/profile
 */
@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    private final UserProfileService userProfileService;

    @Value("${athly.dev.auth-mock-enabled:false}")
    private boolean devAuthMockEnabled;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Resolves the verified user ID server-side.
     * Prevents identity spoofing by refusing caller-selected user IDs.
     * Fails closed (returns null) unless verified authentication exists or
     * server-side local development mock is explicitly enabled.
     */
    private String resolveCurrentUserId(HttpServletRequest request) {
        // 1. Check for verified principal (Spring Security / Auth Filter)
        if (request.getUserPrincipal() != null && request.getUserPrincipal().getName() != null) {
            return request.getUserPrincipal().getName();
        }

        // 2. Safe local development identity: ONLY active when explicitly enabled via server config
        if (devAuthMockEnabled) {
            return "dev-local-user";
        }

        // 3. Fail closed in production or when dev mock is disabled
        return null;
    }

    /**
     * Retrieve the currently authenticated member's profile.
     * GET /api/profile/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentMemberProfile(HttpServletRequest request) {
        String currentUserId = resolveCurrentUserId(request);
        if (currentUserId == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Unauthorized");
            error.put("message", "Authentication required: No verified user session found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        try {
            UserProfileDto profile = userProfileService.getProfileByUserId(currentUserId);
            return ResponseEntity.ok(profile);
        } catch (ResourceNotFoundException ex) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile not yet initialized for member");
            response.put("userId", currentUserId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    /**
     * Create or update the currently authenticated member's profile.
     * PUT /api/profile/me
     * Authoritatively binds to the server-verified user ID, ignoring any caller-supplied ID.
     */
    @PutMapping("/me")
    public ResponseEntity<?> updateCurrentMemberProfile(
            @Valid @RequestBody UserProfileDto profileDto,
            HttpServletRequest request) {
        String currentUserId = resolveCurrentUserId(request);
        if (currentUserId == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Unauthorized");
            error.put("message", "Authentication required: No verified user session found.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        // Authoritatively enforce current member's userId server-side
        profileDto.setUserId(currentUserId);
        if ((profileDto.getEmail() == null || profileDto.getEmail().trim().isEmpty())
                && request.getAttribute("firebaseEmail") != null) {
            profileDto.setEmail((String) request.getAttribute("firebaseEmail"));
        }

        UserProfileDto saved = userProfileService.createOrUpdateProfile(profileDto);
        return ResponseEntity.ok(saved);
    }

    /**
     * Create or initialize a user profile.
     * POST /api/profile
     */
    @PostMapping
    public ResponseEntity<UserProfileDto> createProfile(@Valid @RequestBody UserProfileDto profileDto) {
        if (profileDto.getUserId() == null || profileDto.getUserId().trim().isEmpty()) {
            throw new IllegalArgumentException("User ID is required for direct profile creation");
        }
        UserProfileDto created = userProfileService.createOrUpdateProfile(profileDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Retrieve a user profile by userId.
     * GET /api/profile/{userId}
     */
    @GetMapping("/{userId}")
    public ResponseEntity<UserProfileDto> getProfile(@PathVariable String userId) {
        UserProfileDto profile = userProfileService.getProfileByUserId(userId);
        return ResponseEntity.ok(profile);
    }

    /**
     * Update an existing user profile.
     * PUT /api/profile/{userId}
     */
    @PutMapping("/{userId}")
    public ResponseEntity<UserProfileDto> updateProfile(
            @PathVariable String userId,
            @Valid @RequestBody UserProfileDto profileDto) {
        UserProfileDto updated = userProfileService.updateProfile(userId, profileDto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete a user profile.
     * DELETE /api/profile/{userId}
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> deleteProfile(@PathVariable String userId) {
        userProfileService.deleteProfile(userId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User profile deleted successfully");
        response.put("userId", userId);
        return ResponseEntity.ok(response);
    }
}
