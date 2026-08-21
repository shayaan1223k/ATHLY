package com.athly.backend.controller;

import com.athly.backend.dto.UserProfileDto;
import com.athly.backend.service.UserProfileService;
import jakarta.validation.Valid;
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

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    /**
     * Create or initialize a user profile.
     * POST /api/profile
     */
    @PostMapping
    public ResponseEntity<UserProfileDto> createProfile(@Valid @RequestBody UserProfileDto profileDto) {
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
