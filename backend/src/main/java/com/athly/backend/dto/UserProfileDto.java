package com.athly.backend.dto;

import com.athly.backend.model.UserProfile;
import jakarta.validation.constraints.*;

import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) for UserProfile requests and responses.
 * Enforces input validation rules before data enters the service layer.
 */
public class UserProfileDto {

    // Note: userId is populated securely by server-side identity resolver for /me endpoints
    private String userId;

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotNull(message = "Age is required")
    @Min(value = 10, message = "Age must be at least 10")
    @Max(value = 120, message = "Age cannot exceed 120")
    private Integer age;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotNull(message = "Height is required")
    @DecimalMin(value = "50.0", message = "Height must be at least 50 cm")
    @DecimalMax(value = "300.0", message = "Height cannot exceed 300 cm")
    private Double height; // in cm

    @NotNull(message = "Weight is required")
    @DecimalMin(value = "20.0", message = "Weight must be at least 20 kg")
    @DecimalMax(value = "500.0", message = "Weight cannot exceed 500 kg")
    private Double weight; // in kg

    private Double targetWeight; // in kg (optional)

    @NotBlank(message = "Fitness goal is required (e.g. FAT_LOSS, MUSCLE_GAIN, MAINTENANCE, ENDURANCE)")
    private String fitnessGoal;

    @NotBlank(message = "Activity level is required (e.g. SEDENTARY, LIGHTLY_ACTIVE, MODERATELY_ACTIVE, VERY_ACTIVE)")
    private String activityLevel;

    @NotBlank(message = "Dietary preference is required (e.g. NON_VEGETARIAN, VEGETARIAN, VEGAN, KETO, PESCATARIAN)")
    private String dietaryPreference;

    private Double bmi;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserProfileDto() {
    }

    public static UserProfileDto fromEntity(UserProfile profile) {
        UserProfileDto dto = new UserProfileDto();
        dto.setUserId(profile.getUserId());
        dto.setName(profile.getName());
        dto.setEmail(profile.getEmail());
        dto.setAge(profile.getAge());
        dto.setGender(profile.getGender());
        dto.setHeight(profile.getHeight());
        dto.setWeight(profile.getWeight());
        dto.setTargetWeight(profile.getTargetWeight());
        dto.setFitnessGoal(profile.getFitnessGoal());
        dto.setActivityLevel(profile.getActivityLevel());
        dto.setDietaryPreference(profile.getDietaryPreference());
        dto.setBmi(profile.getBmi());
        dto.setCreatedAt(profile.getCreatedAt());
        dto.setUpdatedAt(profile.getUpdatedAt());
        return dto;
    }

    // Getters and Setters

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getTargetWeight() {
        return targetWeight;
    }

    public void setTargetWeight(Double targetWeight) {
        this.targetWeight = targetWeight;
    }

    public String getFitnessGoal() {
        return fitnessGoal;
    }

    public void setFitnessGoal(String fitnessGoal) {
        this.fitnessGoal = fitnessGoal;
    }

    public String getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(String activityLevel) {
        this.activityLevel = activityLevel;
    }

    public String getDietaryPreference() {
        return dietaryPreference;
    }

    public void setDietaryPreference(String dietaryPreference) {
        this.dietaryPreference = dietaryPreference;
    }

    public Double getBmi() {
        return bmi;
    }

    public void setBmi(Double bmi) {
        this.bmi = bmi;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
