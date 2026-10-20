package com.athly.backend.controller;

import org.bson.Document;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for application health & database connectivity verification.
 * Base path: /api/health
 */
@RestController
@RequestMapping("/api")
public class HealthController {

    private final MongoTemplate mongoTemplate;

    public HealthController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    /**
     * Health check endpoint to verify backend service status and database connectivity.
     * Accessible at: GET /api/health
     *
     * @return JSON response containing service status, database connectivity, and timestamp
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("application", "ATHLY");
        response.put("timestamp", Instant.now().toString());

        try {
            // Safe ping command without modifying or querying user collections
            Document pingResult = mongoTemplate.executeCommand(new Document("ping", 1));
            response.put("status", "UP");
            response.put("database", "CONNECTED");
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            // Safe degraded status without exposing connection strings, hosts, or credentials
            response.put("status", "DEGRADED");
            response.put("database", "DISCONNECTED");
            response.put("databaseError", "Database connection unavailable or uninitialized");
            return ResponseEntity.ok(response);
        }
    }
}
