package com.athly.backend.dto;

import com.athly.backend.model.UserReward;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Summary DTO containing full gamification data:
 * Level progress, streak stats, unlocked badges, and full badge catalog.
 */
public class RewardSummaryDto {

    private String userId;
    private Integer totalXp;
    private Integer currentLevel;
    private String levelTitle;
    private Integer nextLevelXp;
    private Integer xpToNextLevel;
    private Double xpProgressPercent;

    private Integer currentStreak;
    private Integer longestStreak;
    private String lastActiveDate;

    private List<UserReward.Badge> unlockedBadges = new ArrayList<>();
    private List<BadgeCatalogItem> allBadges = new ArrayList<>();

    public RewardSummaryDto() {
    }

    public static class BadgeCatalogItem {
        private String code;
        private String name;
        private String description;
        private String icon;
        private String category;
        private boolean isUnlocked;
        private LocalDateTime unlockedAt;

        public BadgeCatalogItem() {
        }

        public BadgeCatalogItem(String code, String name, String description, String icon,
                                String category, boolean isUnlocked, LocalDateTime unlockedAt) {
            this.code = code;
            this.name = name;
            this.description = description;
            this.icon = icon;
            this.category = category;
            this.isUnlocked = isUnlocked;
            this.unlockedAt = unlockedAt;
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

        public boolean isUnlocked() {
            return isUnlocked;
        }

        public void setUnlocked(boolean unlocked) {
            isUnlocked = unlocked;
        }

        public LocalDateTime getUnlockedAt() {
            return unlockedAt;
        }

        public void setUnlockedAt(LocalDateTime unlockedAt) {
            this.unlockedAt = unlockedAt;
        }
    }

    // Getters and Setters

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

    public Integer getNextLevelXp() {
        return nextLevelXp;
    }

    public void setNextLevelXp(Integer nextLevelXp) {
        this.nextLevelXp = nextLevelXp;
    }

    public Integer getXpToNextLevel() {
        return xpToNextLevel;
    }

    public void setXpToNextLevel(Integer xpToNextLevel) {
        this.xpToNextLevel = xpToNextLevel;
    }

    public Double getXpProgressPercent() {
        return xpProgressPercent;
    }

    public void setXpProgressPercent(Double xpProgressPercent) {
        this.xpProgressPercent = xpProgressPercent;
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

    public List<UserReward.Badge> getUnlockedBadges() {
        return unlockedBadges;
    }

    public void setUnlockedBadges(List<UserReward.Badge> unlockedBadges) {
        this.unlockedBadges = unlockedBadges;
    }

    public List<BadgeCatalogItem> getAllBadges() {
        return allBadges;
    }

    public void setAllBadges(List<BadgeCatalogItem> allBadges) {
        this.allBadges = allBadges;
    }
}
