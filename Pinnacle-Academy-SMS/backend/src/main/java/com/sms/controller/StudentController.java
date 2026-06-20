package com.sms.controller;

import com.sms.dto.StudentDTO;
import com.sms.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Students", description = "Student Management APIs")
@SecurityRequirement(name = "bearer-jwt")
@Slf4j
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get all students",
            description = "Retrieve all students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {

        return ResponseEntity.ok(
                studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get student by ID",
            description = "Retrieve a student by ID")
    public ResponseEntity<StudentDTO> getStudentById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                studentService.getStudentById(id));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','STUDENT')")
    @Operation(
            summary = "Get student by user ID",
            description = "Retrieve student profile by user ID")
    public ResponseEntity<StudentDTO> getStudentByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                studentService.getStudentByUserId(userId));
    }

    @GetMapping("/class/{className}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get students by class",
            description = "Retrieve students by class name")
    public ResponseEntity<List<StudentDTO>> getStudentsByClass(
            @PathVariable String className) {

        return ResponseEntity.ok(
                studentService.getStudentsByClass(className));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Search students",
            description = "Search students by first name")
    public ResponseEntity<List<StudentDTO>> searchStudents(
            @RequestParam String name) {

        return ResponseEntity.ok(
                studentService.searchStudents(name));
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Get active students",
            description = "Retrieve all active students")
    public ResponseEntity<List<StudentDTO>> getActiveStudents() {

        return ResponseEntity.ok(
                studentService.getActiveStudents());
    }

    @GetMapping("/page")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    @Operation(
            summary = "Paginated students",
            description = "Retrieve students with pagination")
    public ResponseEntity<Page<StudentDTO>> getStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(
                studentService.getStudents(page, size));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Create student",
            description = "Create a new student")
    public ResponseEntity<StudentDTO> createStudent(
            @RequestBody StudentDTO studentDTO) {

        return ResponseEntity.ok(
                studentService.createStudent(
                        studentDTO,
                        studentDTO.getUserId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT')")
    @Operation(
            summary = "Update student",
            description = "Update student details")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable Long id,
            @RequestBody StudentDTO studentDTO) {

        return ResponseEntity.ok(
                studentService.updateStudent(id, studentDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(
            summary = "Delete student",
            description = "Deactivate a student")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok(
                "Student deleted successfully");
    }
}