package com.athly.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB Document representing a user's Gamification profile:
 * Total XP points, Level tier, Active streak, and Unlocked Badges.
 * Stored in the 'user_rewards' collection.
 */
@Document(collection = "user_rewards")
public class UserReward {

    @Id
    private String id;

    @Indexed(unique = true)
    private String userId;

    private Integer totalXp = 0;
    private Integer currentLevel = 1;
    private String levelTitle = "Rookie Athlete";

    private Integer currentStreak = 0;
    private Integer longestStreak = 0;
    private String lastActiveDate; // Format: "YYYY-MM-DD"

    private List<Badge> unlockedBadges = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public UserReward() {
    }

    public UserReward(String userId) {
        this.userId = userId;
        this.totalXp = 0;
        this.currentLevel = 1;
        this.levelTitle = "Rookie Athlete";
        this.currentStreak = 0;
        this.longestStreak = 0;
        this.unlockedBadges = new ArrayList<>();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Nested Class representing an Achievement Badge
    public static class Badge {
        private String code;         // Unique badge identifier, e.g. "FIRST_STEP"
        private String name;         // e.g. "First Step Forward"
        private String description;  // e.g. "Logged your first workout or activity"
        private String icon;         // Icon identifier for frontend (e.g. "Flame", "Droplet", "Trophy")
        private String category;     // "STREAK", "HYDRATION", "WORKOUT", "LEVEL", "STEPS"
        private LocalDateTime unlockedAt;

        public Badge() {
        }

        public Badge(String code, String name, String description, String icon, String category) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.icon = icon;
            this.category = category;
            this.unlockedAt = LocalDateTime.now();
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getIcon() {
            return icon;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public LocalDateTime getUnlockedAt() {
            return unlockedAt;
        }

        public void setUnlockedAt(LocalDateTime unlockedAt) {
            this.unlockedAt = unlockedAt;
        }
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getTotalXp() {
        return totalXp;
    }

    public void setTotalXp(Integer totalXp) {
        this.totalXp = totalXp;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(Integer currentLevel) {
        this.currentLevel = currentLevel;
    }

    public String getLevelTitle() {
        return levelTitle;
    }

    public void setLevelTitle(String levelTitle) {
        this.levelTitle = levelTitle;
    }

    public Integer getCurrentStreak() {
        return currentStreak;
    }

    public void setCurrentStreak(Integer currentStreak) {
        this.currentStreak = currentStreak;
    }

    public Integer getLongestStreak() {
        return longestStreak;
    }

    public void setLongestStreak(Integer longestStreak) {
        this.longestStreak = longestStreak;
    }

    public String getLastActiveDate() {
        return lastActiveDate;
    }

    public void setLastActiveDate(String lastActiveDate) {
        this.lastActiveDate = lastActiveDate;
    }

    public List<Badge> getUnlockedBadges() {
        return unlockedBadges;
    }

    public void setUnlockedBadges(List<Badge> unlockedBadges) {
        this.unlockedBadges = unlockedBadges;
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
