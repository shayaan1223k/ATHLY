package com.athly.backend;

import com.athly.backend.controller.HealthController;
import org.bson.Document;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HealthController.class)
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MongoTemplate mongoTemplate;

    @Test
    @DisplayName("GET /api/health returns UP and CONNECTED when MongoDB ping succeeds")
    void healthCheckReturnsUpWhenDatabaseConnected() throws Exception {
        when(mongoTemplate.executeCommand(any(Document.class))).thenReturn(new Document("ok", 1.0));

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.database").value("CONNECTED"))
                .andExpect(jsonPath("$.application").value("ATHLY"));
    }

    @Test
    @DisplayName("GET /api/health returns DEGRADED and DISCONNECTED when MongoDB ping throws exception")
    void healthCheckReturnsDegradedWhenDatabaseDisconnected() throws Exception {
        when(mongoTemplate.executeCommand(any(Document.class))).thenThrow(new RuntimeException("Connection refused"));

        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DEGRADED"))
                .andExpect(jsonPath("$.database").value("DISCONNECTED"))
                .andExpect(jsonPath("$.application").value("ATHLY"))
                .andExpect(jsonPath("$.databaseError").value("Database connection unavailable or uninitialized"));
    }
}
