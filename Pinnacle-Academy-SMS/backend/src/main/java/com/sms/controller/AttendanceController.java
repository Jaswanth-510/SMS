package com.sms.controller;

import com.sms.dto.AttendanceDTO;
import com.sms.service.AttendanceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
@Tag(name = "Attendance", description = "Attendance management endpoints")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<AttendanceDTO> createAttendance(
            @RequestBody AttendanceDTO dto) {

        return ResponseEntity.ok(
                attendanceService.createAttendance(dto)
        );
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<List<AttendanceDTO>> getAllAttendance() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendance()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    public ResponseEntity<AttendanceDTO> getAttendanceById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id)
        );
    }
}