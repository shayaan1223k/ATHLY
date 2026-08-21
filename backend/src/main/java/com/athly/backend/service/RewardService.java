package com.athly.backend.service;

import com.athly.backend.dto.AddXpRequest;
import com.athly.backend.dto.RewardSummaryDto;
import com.athly.backend.model.ActivityLog;
import com.athly.backend.model.UserReward;
import com.athly.backend.repository.UserRewardRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service managing user XP rewards, leveling tiers, consecutive active streaks,
 * and unlocking achievement badges.
 */
@Service
public class RewardService {

    private final UserRewardRepository userRewardRepository;

    public RewardService(UserRewardRepository userRewardRepository) {
        this.userRewardRepository = userRewardRepository;
    }

    /**
     * Award XP to a user and trigger potential level-ups and badge evaluations.
     */
    public RewardSummaryDto awardXp(AddXpRequest request) {
        UserReward reward = getOrCreateReward(request.getUserId());

        int newTotalXp = reward.getTotalXp() + request.getXpAmount();
        reward.setTotalXp(newTotalXp);

        // Update level and title
        updateLevelProgress(reward);

        // Check level-based badge
        if (reward.getCurrentLevel() >= 3) {
            unlockBadgeIfNotPresent(reward, "LEVEL_UP_3", "Iron Discipline",
                    "Reached Level 3: Dedicated Performer", "Award", "LEVEL");
        }

        // Record daily active streak for today
        String today = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
        updateStreak(reward, today);

        reward.setUpdatedAt(LocalDateTime.now());
        userRewardRepository.save(reward);

        return buildSummaryDto(reward);
    }

    /**
     * Update active streak and evaluate activity-related badges when an activity is logged.
     */
    public void evaluateActivityMilestones(String userId, ActivityLog activityLog) {
        UserReward reward = getOrCreateReward(userId);

        // Update streak
        updateStreak(reward, activityLog.getLogDate());

        // Check badge conditions
        // 1. First Step Forward
        if (activityLog.getWorkouts() != null && !activityLog.getWorkouts().isEmpty()) {
            unlockBadgeIfNotPresent(reward, "FIRST_STEP", "First Step Forward",
                    "Logged your first workout session", "Flame", "WORKOUT");
        }

        // 2. Hydration Hero (>= 2500 ml)
        if (activityLog.getWaterIntakeMl() != null && activityLog.getWaterIntakeMl() >= 2500) {
            unlockBadgeIfNotPresent(reward, "HYDRATION_HERO", "Hydration Hero",
                    "Drank at least 2500ml of water in a single day", "Droplet", "HYDRATION");
        }

        // 3. 10k Steps Club
        if (activityLog.getSteps() != null && activityLog.getSteps() >= 10000) {
            unlockBadgeIfNotPresent(reward, "CENTURION_STEPS", "10k Step Club",
                    "Reached 10,000 steps in a single day", "Zap", "STEPS");
        }

        // 4. Streak milestones
        if (reward.getCurrentStreak() >= 7) {
            unlockBadgeIfNotPresent(reward, "STREAK_TITAN_7", "7-Day Titan",
                    "Maintained a 7-day consistency streak", "Trophy", "STREAK");
        }
        if (reward.getCurrentStreak() >= 30) {
            unlockBadgeIfNotPresent(reward, "STREAK_LEGEND_30", "30-Day Legend",
                    "Maintained a 30-day consistency streak", "Trophy", "STREAK");
        }

        reward.setUpdatedAt(LocalDateTime.now());
        userRewardRepository.save(reward);
    }

    /**
     * Retrieve full reward summary for a user.
     */
    public RewardSummaryDto getRewardSummary(String userId) {
        UserReward reward = getOrCreateReward(userId);
        return buildSummaryDto(reward);
    }

    /**
     * Get or initialize a UserReward document in MongoDB.
     */
    public UserReward getOrCreateReward(String userId) {
        return userRewardRepository.findByUserId(userId)
                .orElseGet(() -> {
                    UserReward newReward = new UserReward(userId);
                    return userRewardRepository.save(newReward);
                });
    }

    // --- Streak & Level Calculations ---

    private void updateStreak(UserReward reward, String logDate) {
        if (logDate == null) {
            logDate = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
        }

        if (reward.getLastActiveDate() == null) {
            reward.setCurrentStreak(1);
            reward.setLastActiveDate(logDate);
        } else if (!reward.getLastActiveDate().equals(logDate)) {
            LocalDate lastActive = LocalDate.parse(reward.getLastActiveDate());
            LocalDate currentLog = LocalDate.parse(logDate);

            if (lastActive.plusDays(1).equals(currentLog)) {
                // Active on consecutive day
                reward.setCurrentStreak(reward.getCurrentStreak() + 1);
            } else if (currentLog.isAfter(lastActive.plusDays(1))) {
                // Streak broken, reset to 1
                reward.setCurrentStreak(1);
            }
            reward.setLastActiveDate(logDate);
        }

        if (reward.getCurrentStreak() > reward.getLongestStreak()) {
            reward.setLongestStreak(reward.getCurrentStreak());
        }
    }

    private void updateLevelProgress(UserReward reward) {
        int xp = reward.getTotalXp();

        if (xp >= 5000) {
            reward.setCurrentLevel(5);
            reward.setLevelTitle("Titan of ATHLY");
        } else if (xp >= 3000) {
            reward.setCurrentLevel(4);
            reward.setLevelTitle("Elite Athlete");
        } else if (xp >= 1500) {
            reward.setCurrentLevel(3);
            reward.setLevelTitle("Dedicated Performer");
        } else if (xp >= 500) {
            reward.setCurrentLevel(2);
            reward.setLevelTitle("Fitness Enthusiast");
        } else {
            reward.setCurrentLevel(1);
            reward.setLevelTitle("Rookie Athlete");
        }
    }

    private void unlockBadgeIfNotPresent(UserReward reward, String code, String name,
                                         String description, String icon, String category) {
        boolean alreadyUnlocked = reward.getUnlockedBadges().stream()
                .anyMatch(b -> b.getCode().equalsIgnoreCase(code));

        if (!alreadyUnlocked) {
            reward.getUnlockedBadges().add(new UserReward.Badge(code, name, description, icon, category));
        }
    }

    private RewardSummaryDto buildSummaryDto(UserReward reward) {
        int totalXp = reward.getTotalXp();
        int currentLevel = reward.getCurrentLevel();

        int floorXp;
        int nextLevelXp;

        switch (currentLevel) {
            case 1 -> { floorXp = 0; nextLevelXp = 500; }
            case 2 -> { floorXp = 500; nextLevelXp = 1500; }
            case 3 -> { floorXp = 1500; nextLevelXp = 3000; }
            case 4 -> { floorXp = 3000; nextLevelXp = 5000; }
            default -> { floorXp = 5000; nextLevelXp = 5000; }
        }

        int xpToNextLevel = Math.max(0, nextLevelXp - totalXp);
        double progressPercent;
        if (currentLevel >= 5) {
            progressPercent = 100.0;
        } else {
            double range = nextLevelXp - floorXp;
            double currentInRange = totalXp - floorXp;
            progressPercent = BigDecimal.valueOf((currentInRange * 100.0) / range)
                    .setScale(1, RoundingMode.HALF_UP)
                    .doubleValue();
        }

        // Map unlocked badge codes for catalog check
        Set<String> unlockedCodes = reward.getUnlockedBadges().stream()
                .map(UserReward.Badge::getCode)
                .collect(Collectors.toSet());

        Map<String, LocalDateTime> unlockedTimestamps = reward.getUnlockedBadges().stream()
                .collect(Collectors.toMap(UserReward.Badge::getCode, UserReward.Badge::getUnlockedAt, (a, b) -> a));

        List<RewardSummaryDto.BadgeCatalogItem> allBadges = getMasterBadgeCatalog().stream()
                .map(catalogBadge -> new RewardSummaryDto.BadgeCatalogItem(
                        catalogBadge.getCode(),
                        catalogBadge.getName(),
                        catalogBadge.getDescription(),
                        catalogBadge.getIcon(),
                        catalogBadge.getCategory(),
                        unlockedCodes.contains(catalogBadge.getCode()),
                        unlockedTimestamps.get(catalogBadge.getCode())
                ))
                .collect(Collectors.toList());

        RewardSummaryDto summary = new RewardSummaryDto();
        summary.setUserId(reward.getUserId());
        summary.setTotalXp(totalXp);
        summary.setCurrentLevel(currentLevel);
        summary.setLevelTitle(reward.getLevelTitle());
        summary.setNextLevelXp(nextLevelXp);
        summary.setXpToNextLevel(xpToNextLevel);
        summary.setXpProgressPercent(progressPercent);
        summary.setCurrentStreak(reward.getCurrentStreak());
        summary.setLongestStreak(reward.getLongestStreak());
        summary.setLastActiveDate(reward.getLastActiveDate());
        summary.setUnlockedBadges(reward.getUnlockedBadges());
        summary.setAllBadges(allBadges);

        return summary;
    }

    private List<UserReward.Badge> getMasterBadgeCatalog() {
        return List.of(
                new UserReward.Badge("FIRST_STEP", "First Step Forward", "Logged your first workout session", "Flame", "WORKOUT"),
                new UserReward.Badge("HYDRATION_HERO", "Hydration Hero", "Drank at least 2500ml of water in a single day", "Droplet", "HYDRATION"),
                new UserReward.Badge("CENTURION_STEPS", "10k Step Club", "Reached 10,000 steps in a single day", "Zap", "STEPS"),
                new UserReward.Badge("STREAK_TITAN_7", "7-Day Titan", "Maintained a 7-day consistency streak", "Trophy", "STREAK"),
                new UserReward.Badge("STREAK_LEGEND_30", "30-Day Legend", "Maintained a 30-day consistency streak", "Trophy", "STREAK"),
                new UserReward.Badge("LEVEL_UP_3", "Iron Discipline", "Reached Level 3: Dedicated Performer", "Award", "LEVEL")
        );
    }
}
