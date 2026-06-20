package com.sms.service;

import com.sms.dto.AttendanceDTO;
import com.sms.entity.Attendance;
import com.sms.entity.Course;
import com.sms.entity.Student;
import com.sms.repository.AttendanceRepository;
import com.sms.repository.CourseRepository;
import com.sms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public AttendanceDTO createAttendance(AttendanceDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"));

        Attendance attendance = Attendance.builder()
                .student(student)
                .course(course)
                .attendanceDate(dto.getAttendanceDate())
                .status(Attendance.AttendanceStatus.valueOf(dto.getStatus()))
                .remarks(dto.getRemarks())
                .build();

        return mapToDTO(
                attendanceRepository.save(attendance)
        );
    }

    public List<AttendanceDTO> getAllAttendance() {

        return attendanceRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AttendanceDTO getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Attendance not found"));

        return mapToDTO(attendance);
    }

    public AttendanceDTO updateAttendance(
            Long id,
            AttendanceDTO dto) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Attendance not found"));

        attendance.setAttendanceDate(dto.getAttendanceDate());
        attendance.setStatus(
                Attendance.AttendanceStatus.valueOf(
                        dto.getStatus()
                )
        );
        attendance.setRemarks(dto.getRemarks());

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return mapToDTO(updatedAttendance);
    }

    public void deleteAttendance(Long id) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Attendance not found"));

        attendanceRepository.delete(attendance);
    }

    private AttendanceDTO mapToDTO(
            Attendance attendance) {

        return AttendanceDTO.builder()
                .id(attendance.getId())
                .studentId(
                        attendance.getStudent().getId())
                .studentName(
                        attendance.getStudent()
                                .getUser()
                                .getFirstName()
                                + " "
                                + attendance.getStudent()
                                .getUser()
                                .getLastName())
                .courseId(
                        attendance.getCourse().getId())
                .courseName(
                        attendance.getCourse()
                                .getCourseName())
                .attendanceDate(
                        attendance.getAttendanceDate())
                .status(
                        attendance.getStatus().name())
                .remarks(
                        attendance.getRemarks())
                .build();
    }
}