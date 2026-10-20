package com.athly.backend.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Spring configuration bean for Firebase Admin SDK initialization.
 * Supports:
 * 1. Raw JSON service account string via FIREBASE_CREDENTIALS_JSON (ideal for Render/cloud deployments)
 * 2. File path via FIREBASE_CREDENTIALS_PATH (ideal for local development)
 * 3. Google Application Default Credentials (ADC)
 *
 * Fails safely and gracefully: if no credentials are provided in development, logs a warning
 * rather than crashing Spring Boot startup, allowing unauthenticated health checks and local mock workflows.
 */
@Configuration
public class FirebaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseConfig.class);

    @Value("${firebase.credentials.path:}")
    private String credentialsPath;

    @Value("${firebase.credentials.json:}")
    private String credentialsJson;

    @Value("${firebase.project.id:}")
    private String projectId;

    private boolean initialized = false;

    @PostConstruct
    public void initializeFirebase() {
        if (!FirebaseApp.getApps().isEmpty()) {
            this.initialized = true;
            logger.info("[ATHLY FIREBASE] FirebaseApp already initialized.");
            return;
        }

        try {
            GoogleCredentials credentials = null;

            // Strategy 1: Raw JSON credentials from environment variable
            if (credentialsJson != null && !credentialsJson.trim().isEmpty()) {
                logger.info("[ATHLY FIREBASE] Initializing Firebase Admin SDK from FIREBASE_CREDENTIALS_JSON.");
                credentials = GoogleCredentials.fromStream(
                        new ByteArrayInputStream(credentialsJson.trim().getBytes(StandardCharsets.UTF_8))
                );
            }
            // Strategy 2: File path from environment variable or properties
            else if (credentialsPath != null && !credentialsPath.trim().isEmpty()) {
                File credentialsFile = new File(credentialsPath.trim());
                if (credentialsFile.exists() && credentialsFile.canRead()) {
                    logger.info("[ATHLY FIREBASE] Initializing Firebase Admin SDK from file path: {}", credentialsFile.getAbsolutePath());
                    credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsFile));
                } else {
                    logger.warn("[ATHLY FIREBASE] Credentials file specified at '{}' does not exist or cannot be read.", credentialsPath);
                }
            }

            // Strategy 3: Attempt Google Application Default Credentials
            if (credentials == null) {
                try {
                    credentials = GoogleCredentials.getApplicationDefault();
                    logger.info("[ATHLY FIREBASE] Initializing Firebase Admin SDK from Application Default Credentials.");
                } catch (IOException ex) {
                    logger.info("[ATHLY FIREBASE] Google Application Default Credentials not present on host.");
                }
            }

            if (credentials != null) {
                FirebaseOptions.Builder builder = FirebaseOptions.builder().setCredentials(credentials);
                if (projectId != null && !projectId.trim().isEmpty()) {
                    builder.setProjectId(projectId.trim());
                }
                FirebaseApp.initializeApp(builder.build());
                this.initialized = true;
                logger.info("[ATHLY FIREBASE] Firebase Admin SDK initialized successfully.");
            } else {
                this.initialized = false;
                logger.warn("[ATHLY FIREBASE] No Firebase Admin credentials found. Server running without live token verification (mock mode required for authenticated endpoints).");
            }
        } catch (Exception e) {
            this.initialized = false;
            logger.error("[ATHLY FIREBASE] Failed to initialize Firebase Admin SDK: {}", e.getMessage(), e);
        }
    }

    public boolean isInitialized() {
        return initialized && !FirebaseApp.getApps().isEmpty();
    }

    public FirebaseAuth getFirebaseAuth() {
        if (!isInitialized()) {
            return null;
        }
        return FirebaseAuth.getInstance();
    }
}
