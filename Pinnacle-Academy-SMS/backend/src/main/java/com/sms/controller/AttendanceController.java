package com.sms.controller;

import com.sms.dto.AttendanceDTO;
import com.sms.service.AttendanceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(
        name = "Attendance",
        description = "Attendance Management APIs"
)
@SecurityRequirement(name = "bearer-jwt")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(
            AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Create attendance",
            description = "Create a new attendance record"
    )
    public ResponseEntity<AttendanceDTO> createAttendance(
            @RequestBody AttendanceDTO dto) {

        return ResponseEntity.ok(
                attendanceService.createAttendance(dto)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get all attendance",
            description = "Retrieve all attendance records"
    )
    public ResponseEntity<List<AttendanceDTO>> getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get attendance by ID",
            description = "Retrieve attendance by ID"
    )
    public ResponseEntity<AttendanceDTO> getAttendanceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id)
        );
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get attendance by student",
            description = "Retrieve attendance records by student ID"
    )
    public ResponseEntity<List<AttendanceDTO>>
    getAttendanceByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByStudent(studentId)
        );
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get attendance by course",
            description = "Retrieve attendance records by course ID"
    )
    public ResponseEntity<List<AttendanceDTO>>
    getAttendanceByCourse(
            @PathVariable Long courseId) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByCourse(courseId)
        );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Update attendance",
            description = "Update attendance details"
    )
    public ResponseEntity<AttendanceDTO> updateAttendance(
            @PathVariable Long id,
            @RequestBody AttendanceDTO dto) {

        return ResponseEntity.ok(
                attendanceService.updateAttendance(id, dto)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Delete attendance",
            description = "Delete an attendance record"
    )
    public ResponseEntity<String> deleteAttendance(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);

        return ResponseEntity.ok(
                "Attendance deleted successfully"
        );
    }
}