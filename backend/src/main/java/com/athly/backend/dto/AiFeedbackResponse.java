package com.athly.backend.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Response DTO returned by the Dynamic AI Coaching Feedback Engine.
 */
public class AiFeedbackResponse {

    private String userId;
    private String coachTitle;
    private String overallEvaluation;
    private Integer consistencyScore; // 0 - 100
    private String trainingFeedback;
    private String nutritionFeedback;
    private String recoveryFeedback;
    private List<String> actionItems = new ArrayList<>();
    private String motivationalQuote;
    private LocalDateTime generatedAt;

    public AiFeedbackResponse() {
        this.generatedAt = LocalDateTime.now();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCoachTitle() {
        return coachTitle;
    }

    public void setCoachTitle(String coachTitle) {
        this.coachTitle = coachTitle;
    }

    public String getOverallEvaluation() {
        return overallEvaluation;
    }

    public void setOverallEvaluation(String overallEvaluation) {
        this.overallEvaluation = overallEvaluation;
    }

    public Integer getConsistencyScore() {
        return consistencyScore;
    }

    public void setConsistencyScore(Integer consistencyScore) {
        this.consistencyScore = consistencyScore;
    }

    public String getTrainingFeedback() {
        return trainingFeedback;
    }

    public void setTrainingFeedback(String trainingFeedback) {
        this.trainingFeedback = trainingFeedback;
    }

    public String getNutritionFeedback() {
        return nutritionFeedback;
    }

    public void setNutritionFeedback(String nutritionFeedback) {
        this.nutritionFeedback = nutritionFeedback;
    }

    public String getRecoveryFeedback() {
        return recoveryFeedback;
    }

    public void setRecoveryFeedback(String recoveryFeedback) {
        this.recoveryFeedback = recoveryFeedback;
    }

    public List<String> getActionItems() {
        return actionItems;
    }

    public void setActionItems(List<String> actionItems) {
        this.actionItems = actionItems;
    }

    public String getMotivationalQuote() {
        return motivationalQuote;
    }

    public void setMotivationalQuote(String motivationalQuote) {
        this.motivationalQuote = motivationalQuote;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }
}
