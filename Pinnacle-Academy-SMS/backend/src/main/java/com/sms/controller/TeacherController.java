package com.sms.controller;

import com.sms.dto.TeacherDTO;
import com.sms.service.TeacherService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
@Tag(name = "Teachers", description = "Teacher management endpoints")
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@SecurityRequirement(name = "bearer-jwt")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Get all teachers", description = "Retrieve all teachers")
    public ResponseEntity<List<TeacherDTO>> getAllTeachers() {
        List<TeacherDTO> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    @Operation(summary = "Get teacher by ID", description = "Retrieve a specific teacher")
    public ResponseEntity<TeacherDTO> getTeacherById(@PathVariable Long id) {
        TeacherDTO teacher = teacherService.getTeacherById(id);
        return ResponseEntity.ok(teacher);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER', 'STUDENT')")
    @Operation(summary = "Get teacher by user ID", description = "Retrieve teacher profile by user ID")
    public ResponseEntity<TeacherDTO> getTeacherByUserId(@PathVariable Long userId) {
        TeacherDTO teacher = teacherService.getTeacherByUserId(userId);
        return ResponseEntity.ok(teacher);
    }

    @GetMapping("/department/{department}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Get teachers by department", description = "Retrieve all teachers in a specific department")
    public ResponseEntity<List<TeacherDTO>> getTeachersByDepartment(@PathVariable String department) {
        List<TeacherDTO> teachers = teacherService.getTeachersByDepartment(department);
        return ResponseEntity.ok(teachers);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create teacher", description = "Create a new teacher")
    public ResponseEntity<TeacherDTO> createTeacher(@RequestBody TeacherDTO teacherDTO) {
        try {
            TeacherDTO createdTeacher = teacherService.createTeacher(teacherDTO, teacherDTO.getUserId());
            return ResponseEntity.ok(createdTeacher);
        } catch (Exception e) {
            log.error("Error creating teacher: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    @Operation(summary = "Update teacher", description = "Update teacher information")
    public ResponseEntity<TeacherDTO> updateTeacher(@PathVariable Long id, @RequestBody TeacherDTO teacherDTO) {
        try {
            TeacherDTO updatedTeacher = teacherService.updateTeacher(id, teacherDTO);
            return ResponseEntity.ok(updatedTeacher);
        } catch (Exception e) {
            log.error("Error updating teacher: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete teacher", description = "Deactivate a teacher")
    public ResponseEntity<String> deleteTeacher(@PathVariable Long id) {
        try {
            teacherService.deleteTeacher(id);
            return ResponseEntity.ok("Teacher deleted successfully");
        } catch (Exception e) {
            log.error("Error deleting teacher: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
