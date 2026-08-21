package com.athly.backend.service;

import com.athly.backend.dto.UserProfileDto;
import com.athly.backend.exception.ResourceNotFoundException;
import com.athly.backend.model.UserProfile;
import com.athly.backend.repository.UserProfileRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

/**
 * Service layer for User Profile management.
 * Encapsulates business logic, BMI calculations, and MongoDB interactions.
 */
@Service
public class UserProfileService {

    private final UserProfileRepository userProfileRepository;

    public UserProfileService(UserProfileRepository userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Create a new user profile or update if it already exists.
     * Calculates BMI automatically from height and weight.
     */
    public UserProfileDto createOrUpdateProfile(UserProfileDto dto) {
        Double bmi = calculateBmi(dto.getWeight(), dto.getHeight());

        UserProfile profile = userProfileRepository.findByUserId(dto.getUserId())
                .orElse(new UserProfile());

        profile.setUserId(dto.getUserId());
        profile.setName(dto.getName());
        profile.setEmail(dto.getEmail());
        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());
        profile.setHeight(dto.getHeight());
        profile.setWeight(dto.getWeight());
        profile.setTargetWeight(dto.getTargetWeight());
        profile.setFitnessGoal(dto.getFitnessGoal());
        profile.setActivityLevel(dto.getActivityLevel());
        profile.setDietaryPreference(dto.getDietaryPreference());
        profile.setBmi(bmi);

        if (profile.getCreatedAt() == null) {
            profile.setCreatedAt(LocalDateTime.now());
        }
        profile.setUpdatedAt(LocalDateTime.now());

        UserProfile savedProfile = userProfileRepository.save(profile);
        return UserProfileDto.fromEntity(savedProfile);
    }

    /**
     * Retrieve a user profile by unique userId.
     * Throws ResourceNotFoundException if no profile is found.
     */
    public UserProfileDto getProfileByUserId(String userId) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found for user ID: " + userId));
        return UserProfileDto.fromEntity(profile);
    }

    /**
     * Update an existing user profile.
     */
    public UserProfileDto updateProfile(String userId, UserProfileDto dto) {
        UserProfile profile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User profile not found for user ID: " + userId));

        Double bmi = calculateBmi(dto.getWeight(), dto.getHeight());

        profile.setName(dto.getName());
        profile.setEmail(dto.getEmail());
        profile.setAge(dto.getAge());
        profile.setGender(dto.getGender());
        profile.setHeight(dto.getHeight());
        profile.setWeight(dto.getWeight());
        profile.setTargetWeight(dto.getTargetWeight());
        profile.setFitnessGoal(dto.getFitnessGoal());
        profile.setActivityLevel(dto.getActivityLevel());
        profile.setDietaryPreference(dto.getDietaryPreference());
        profile.setBmi(bmi);
        profile.setUpdatedAt(LocalDateTime.now());

        UserProfile updatedProfile = userProfileRepository.save(profile);
        return UserProfileDto.fromEntity(updatedProfile);
    }

    /**
     * Delete a user profile by userId.
     */
    public void deleteProfile(String userId) {
        if (!userProfileRepository.existsByUserId(userId)) {
            throw new ResourceNotFoundException("User profile not found for user ID: " + userId);
        }
        userProfileRepository.deleteByUserId(userId);
    }

    /**
     * Utility method to calculate Body Mass Index (BMI):
     * BMI = weight (kg) / (height (m) ^ 2)
     * Rounded to 1 decimal place.
     */
    public Double calculateBmi(Double weightKg, Double heightCm) {
        if (weightKg == null || heightCm == null || heightCm <= 0) {
            return null;
        }
        double heightInMeters = heightCm / 100.0;
        double bmi = weightKg / (heightInMeters * heightInMeters);
        return BigDecimal.valueOf(bmi)
                .setScale(1, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
