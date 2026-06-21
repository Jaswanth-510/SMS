package com.sms.controller;

import com.sms.dto.MarksDTO;
import com.sms.service.MarksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marks")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(
        name = "Marks",
        description = "Marks Management APIs"
)
@SecurityRequirement(name = "bearer-jwt")
public class MarksController {

    private final MarksService marksService;

    public MarksController(
            MarksService marksService) {
        this.marksService = marksService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Create marks",
            description = "Create a new marks record"
    )
    public ResponseEntity<MarksDTO> createMarks(
            @RequestBody MarksDTO marksDTO) {

        return ResponseEntity.ok(
                marksService.createMarks(marksDTO)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get all marks",
            description = "Retrieve all marks records"
    )
    public ResponseEntity<List<MarksDTO>> getAllMarks() {

        return ResponseEntity.ok(
                marksService.getAllMarks()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get marks by ID",
            description = "Retrieve marks by ID"
    )
    public ResponseEntity<MarksDTO> getMarksById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                marksService.getMarksById(id)
        );
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get marks by student",
            description = "Retrieve marks records by student ID"
    )
    public ResponseEntity<List<MarksDTO>>
    getMarksByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                marksService.getMarksByStudent(studentId)
        );
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get marks by course",
            description = "Retrieve marks records by course ID"
    )
    public ResponseEntity<List<MarksDTO>>
    getMarksByCourse(
            @PathVariable Long courseId) {

        return ResponseEntity.ok(
                marksService.getMarksByCourse(courseId)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Update marks",
            description = "Update marks information"
    )
    public ResponseEntity<MarksDTO> updateMarks(
            @PathVariable Long id,
            @RequestBody MarksDTO marksDTO) {

        return ResponseEntity.ok(
                marksService.updateMarks(
                        id,
                        marksDTO
                )
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Delete marks",
            description = "Delete a marks record"
    )
    public ResponseEntity<String> deleteMarks(
            @PathVariable Long id) {

        marksService.deleteMarks(id);

        return ResponseEntity.ok(
                "Marks deleted successfully"
        );
    }
}