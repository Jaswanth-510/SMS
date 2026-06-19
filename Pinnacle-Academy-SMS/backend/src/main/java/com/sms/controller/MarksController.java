package com.sms.controller;

import com.sms.dto.MarksDTO;
import com.sms.service.MarksService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marks")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Marks", description = "Marks Management APIs")
public class MarksController {

    private final MarksService marksService;

    public MarksController(MarksService marksService) {
        this.marksService = marksService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<MarksDTO> createMarks(@RequestBody MarksDTO marksDTO) {
        return ResponseEntity.ok(marksService.createMarks(marksDTO));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<MarksDTO>> getAllMarks() {
        return ResponseEntity.ok(marksService.getAllMarks());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    public ResponseEntity<MarksDTO> getMarksById(@PathVariable Long id) {
        return ResponseEntity.ok(marksService.getMarksById(id));
    }
}