package com.sms.service;

import com.sms.dto.StudentDTO;
import com.sms.entity.Student;
import com.sms.entity.User;
import com.sms.repository.StudentRepository;
import com.sms.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public StudentDTO createStudent(StudentDTO studentDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Student student = Student.builder()
                .user(user)
                .enrollmentNumber(studentDTO.getEnrollmentNumber())
                .rollNumber(studentDTO.getRollNumber())
                .className(studentDTO.getClassName())
                .section(studentDTO.getSection())
                .dateOfBirth(studentDTO.getDateOfBirth())
                .phoneNumber(studentDTO.getPhoneNumber())
                .address(studentDTO.getAddress())
                .parentName(studentDTO.getParentName())
                .parentPhone(studentDTO.getParentPhone())
                .enrollmentDate(LocalDate.now())
                .build();

        Student savedStudent = studentRepository.save(student);
        return mapToDTO(savedStudent);
    }

    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return mapToDTO(student);
    }

    public StudentDTO getStudentByUserId(Long userId) {
        Student student = studentRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return mapToDTO(student);
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<StudentDTO> getStudentsByClass(String className) {
        return studentRepository.findByClassName(className).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setRollNumber(studentDTO.getRollNumber());
        student.setClassName(studentDTO.getClassName());
        student.setSection(studentDTO.getSection());
        student.setPhoneNumber(studentDTO.getPhoneNumber());
        student.setAddress(studentDTO.getAddress());
        student.setParentName(studentDTO.getParentName());
        student.setParentPhone(studentDTO.getParentPhone());

        Student updatedStudent = studentRepository.save(student);
        return mapToDTO(updatedStudent);
    }

    @Transactional
    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        student.setIsActive(false);
        studentRepository.save(student);
    }

    private StudentDTO mapToDTO(Student student) {
        return StudentDTO.builder()
                .id(student.getId())
                .email(student.getUser().getEmail())
                .firstName(student.getUser().getFirstName())
                .lastName(student.getUser().getLastName())
                .enrollmentNumber(student.getEnrollmentNumber())
                .rollNumber(student.getRollNumber())
                .className(student.getClassName())
                .section(student.getSection())
                .dateOfBirth(student.getDateOfBirth())
                .phoneNumber(student.getPhoneNumber())
                .address(student.getAddress())
                .parentName(student.getParentName())
                .parentPhone(student.getParentPhone())
                .enrollmentDate(student.getEnrollmentDate())
                .gpa(student.getGpa())
                .isActive(student.getIsActive())
                .build();
    }
}
