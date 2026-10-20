package com.athly.backend;

import com.athly.backend.controller.UserProfileController;
import com.athly.backend.dto.UserProfileDto;
import com.athly.backend.exception.ResourceNotFoundException;
import com.athly.backend.service.UserProfileService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserProfileController.class)
@TestPropertySource(properties = {
        "athly.dev.auth-mock-enabled=true"
})
class UserProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserProfileService userProfileService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("GET /api/profile/me in dev mode returns member profile for dev-local-user")
    void getProfileMeReturnsDevUserWhenMockEnabled() throws Exception {
        UserProfileDto dto = new UserProfileDto();
        dto.setUserId("dev-local-user");
        dto.setName("Alex Hunter");
        dto.setEmail("alex.hunter@example.com");
        dto.setAge(27);
        dto.setGender("Male");
        dto.setHeight(178.0);
        dto.setWeight(75.5);
        dto.setFitnessGoal("MUSCLE_GAIN");
        dto.setActivityLevel("MODERATELY_ACTIVE");
        dto.setDietaryPreference("NON_VEGETARIAN");
        dto.setBmi(23.8);

        when(userProfileService.getProfileByUserId("dev-local-user")).thenReturn(dto);

        mockMvc.perform(get("/api/profile/me"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("dev-local-user"))
                .andExpect(jsonPath("$.name").value("Alex Hunter"))
                .andExpect(jsonPath("$.email").value("alex.hunter@example.com"))
                .andExpect(jsonPath("$.fitnessGoal").value("MUSCLE_GAIN"))
                .andExpect(jsonPath("$.bmi").value(23.8));
    }

    @Test
    @DisplayName("GET /api/profile/me returns 404 when profile is not yet initialized")
    void getProfileMeReturnsNotFoundWhenUninitialized() throws Exception {
        when(userProfileService.getProfileByUserId("dev-local-user"))
                .thenThrow(new ResourceNotFoundException("User profile not found for user ID: dev-local-user"));

        mockMvc.perform(get("/api/profile/me"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Profile not yet initialized for member"))
                .andExpect(jsonPath("$.userId").value("dev-local-user"));
    }

    @Test
    @DisplayName("PUT /api/profile/me authoritatively binds to dev-local-user and saves")
    void updateProfileMeSavesValidProfile() throws Exception {
        UserProfileDto inputDto = new UserProfileDto();
        inputDto.setName("Alex Hunter");
        inputDto.setEmail("alex.hunter@example.com");
        inputDto.setAge(28);
        inputDto.setGender("Male");
        inputDto.setHeight(180.0);
        inputDto.setWeight(76.0);
        inputDto.setFitnessGoal("MUSCLE_GAIN");
        inputDto.setActivityLevel("MODERATELY_ACTIVE");
        inputDto.setDietaryPreference("NON_VEGETARIAN");

        UserProfileDto savedDto = new UserProfileDto();
        savedDto.setUserId("dev-local-user");
        savedDto.setName("Alex Hunter");
        savedDto.setEmail("alex.hunter@example.com");
        savedDto.setAge(28);
        savedDto.setGender("Male");
        savedDto.setHeight(180.0);
        savedDto.setWeight(76.0);
        savedDto.setFitnessGoal("MUSCLE_GAIN");
        savedDto.setActivityLevel("MODERATELY_ACTIVE");
        savedDto.setDietaryPreference("NON_VEGETARIAN");
        savedDto.setBmi(23.5);

        when(userProfileService.createOrUpdateProfile(any(UserProfileDto.class))).thenReturn(savedDto);

        mockMvc.perform(put("/api/profile/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("dev-local-user"))
                .andExpect(jsonPath("$.age").value(28))
                .andExpect(jsonPath("$.height").value(180.0))
                .andExpect(jsonPath("$.bmi").value(23.5));
    }

    @Test
    @DisplayName("PUT /api/profile/me rejects invalid input with 400 Bad Request")
    void updateProfileMeRejectsInvalidData() throws Exception {
        UserProfileDto invalidDto = new UserProfileDto();
        invalidDto.setName(""); // Invalid: blank
        invalidDto.setEmail("not-an-email"); // Invalid: malformed email
        invalidDto.setAge(5); // Invalid: min 10
        invalidDto.setHeight(10.0); // Invalid: min 50.0
        invalidDto.setWeight(5.0); // Invalid: min 20.0

        mockMvc.perform(put("/api/profile/me")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidDto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }
}
