package com.athly.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for basic application health verification.
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    /**
     * Health check endpoint to verify backend service status.
     * Accessible at: GET http://localhost:8080/api/health
     *
     * @return JSON response containing status and application name
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("application", "ATHLY");
        return ResponseEntity.ok(response);
    }
}
