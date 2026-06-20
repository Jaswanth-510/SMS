package com.sms.controller;

import com.sms.dto.FeeDTO;
import com.sms.service.FeeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fees")
@Tag(name = "Fees", description = "Fee management endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<FeeDTO> createFee(
            @RequestBody FeeDTO dto) {

        return ResponseEntity.ok(
                feeService.createFee(dto)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<FeeDTO>> getAllFees() {

        return ResponseEntity.ok(
                feeService.getAllFees()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    public ResponseEntity<FeeDTO> getFeeById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                feeService.getFeeById(id)
        );
    }
}