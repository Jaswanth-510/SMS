package com.sms.service;

import com.sms.dto.TeacherDTO;
import com.sms.entity.Teacher;
import com.sms.entity.User;
import com.sms.repository.TeacherRepository;
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
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public TeacherDTO createTeacher(TeacherDTO teacherDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Teacher teacher = Teacher.builder()
                .user(user)
                .employeeId(teacherDTO.getEmployeeId())
                .specialization(teacherDTO.getSpecialization())
                .qualifications(teacherDTO.getQualifications())
                .department(teacherDTO.getDepartment())
                .joinDate(LocalDate.now())
                .phoneNumber(teacherDTO.getPhoneNumber())
                .address(teacherDTO.getAddress())
                .build();

        Teacher savedTeacher = teacherRepository.save(teacher);
        return mapToDTO(savedTeacher);
    }

    public TeacherDTO getTeacherById(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        return mapToDTO(teacher);
    }

    public TeacherDTO getTeacherByUserId(Long userId) {
        Teacher teacher = teacherRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        return mapToDTO(teacher);
    }

    public List<TeacherDTO> getAllTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<TeacherDTO> getTeachersByDepartment(String department) {
        return teacherRepository.findByDepartment(department).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TeacherDTO updateTeacher(Long id, TeacherDTO teacherDTO) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacher.setSpecialization(teacherDTO.getSpecialization());
        teacher.setQualifications(teacherDTO.getQualifications());
        teacher.setDepartment(teacherDTO.getDepartment());
        teacher.setPhoneNumber(teacherDTO.getPhoneNumber());
        teacher.setAddress(teacherDTO.getAddress());

        Teacher updatedTeacher = teacherRepository.save(teacher);
        return mapToDTO(updatedTeacher);
    }

    @Transactional
    public void deleteTeacher(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        teacher.setIsActive(false);
        teacherRepository.save(teacher);
    }

    private TeacherDTO mapToDTO(Teacher teacher) {
    return TeacherDTO.builder()
            .id(teacher.getId())
            .userId(teacher.getUser().getId()) // ADD THIS
            .email(teacher.getUser().getEmail())
            .firstName(teacher.getUser().getFirstName())
            .lastName(teacher.getUser().getLastName())
            .employeeId(teacher.getEmployeeId())
            .specialization(teacher.getSpecialization())
            .qualifications(teacher.getQualifications())
            .department(teacher.getDepartment())
            .joinDate(teacher.getJoinDate())
            .phoneNumber(teacher.getPhoneNumber())
            .address(teacher.getAddress())
            .isActive(teacher.getIsActive())
            .build();
}
}
