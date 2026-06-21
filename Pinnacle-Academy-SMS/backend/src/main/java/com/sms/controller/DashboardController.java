package com.sms.controller;

import com.sms.dto.DashboardStatsDTO;
import com.sms.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(
    name = "Dashboard",
    description = "Dashboard statistics and analytics APIs"
)
@SecurityRequirement(name = "bearer-jwt")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Get dashboard statistics",
            description = "Retrieve complete dashboard statistics for the admin panel"
    )
    public ResponseEntity<DashboardStatsDTO> getStats() {
        return ResponseEntity.ok(
                dashboardService.getStats()
        );
    }
}