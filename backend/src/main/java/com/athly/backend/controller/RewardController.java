package com.athly.backend.controller;

import com.athly.backend.dto.AddXpRequest;
import com.athly.backend.dto.RewardSummaryDto;
import com.athly.backend.service.RewardService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Gamification & Rewards endpoints.
 * Base path: /api/rewards
 */
@RestController
@RequestMapping("/api/rewards")
public class RewardController {

    private final RewardService rewardService;

    public RewardController(RewardService rewardService) {
        this.rewardService = rewardService;
    }

    /**
     * Retrieve the user's gamification profile: XP, level progress, streak, and badges.
     * GET /api/rewards/{userId}
     */
    @GetMapping("/{userId}")
    public ResponseEntity<RewardSummaryDto> getRewardSummary(@PathVariable String userId) {
        RewardSummaryDto summary = rewardService.getRewardSummary(userId);
        return ResponseEntity.ok(summary);
    }

    /**
     * Award XP to a user (e.g. for quest completion or manual bonuses).
     * POST /api/rewards/xp
     */
    @PostMapping("/xp")
    public ResponseEntity<RewardSummaryDto> awardXp(@Valid @RequestBody AddXpRequest request) {
        RewardSummaryDto summary = rewardService.awardXp(request);
        return ResponseEntity.ok(summary);
    }

    /**
     * Daily check-in endpoint: Awards +15 XP and updates the user's active streak.
     * POST /api/rewards/check-in/{userId}
     */
    @PostMapping("/check-in/{userId}")
    public ResponseEntity<RewardSummaryDto> dailyCheckIn(@PathVariable String userId) {
        AddXpRequest checkInRequest = new AddXpRequest(userId, 15, "DAILY_CHECKIN", "Daily active check-in");
        RewardSummaryDto summary = rewardService.awardXp(checkInRequest);
        return ResponseEntity.ok(summary);
    }
}
