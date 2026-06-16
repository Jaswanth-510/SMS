package com.sms.controller;

import com.sms.dto.AuthDTO;
import com.sms.dto.LoginResponseDTO;
import com.sms.dto.RegisterRequestDTO;
import com.sms.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Authentication endpoints")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    @Operation(summary = "Login user", description = "Login with email and password")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody AuthDTO authDTO) {
        try {
            LoginResponseDTO response = authService.login(authDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Register as student or teacher")
    public ResponseEntity<LoginResponseDTO> register(@RequestBody RegisterRequestDTO registerDTO) {
        try {
            LoginResponseDTO response = authService.register(registerDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check if API is running")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("API is running");
    }
}
