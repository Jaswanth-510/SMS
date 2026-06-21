package com.sms.service;

import com.sms.dto.AttendanceDTO;
import com.sms.entity.Attendance;
import com.sms.entity.Course;
import com.sms.entity.Student;
import com.sms.repository.AttendanceRepository;
import com.sms.repository.CourseRepository;
import com.sms.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public AttendanceService(
            AttendanceRepository attendanceRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {

        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public AttendanceDTO createAttendance(
            AttendanceDTO dto) {

        Student student = studentRepository.findById(
                dto.getStudentId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Student not found"));

        Course course = courseRepository.findById(
                dto.getCourseId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Course not found"));

        Attendance attendance = Attendance.builder()
                .student(student)
                .course(course)
                .attendanceDate(dto.getAttendanceDate())
                .status(
                        Attendance.AttendanceStatus.valueOf(
                                dto.getStatus()))
                .remarks(dto.getRemarks())
                .build();

        return mapToDTO(
                attendanceRepository.save(attendance));
    }

    @Transactional(readOnly = true)
    public List<AttendanceDTO> getAllAttendance() {

        return attendanceRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public AttendanceDTO getAttendanceById(
            Long id) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Attendance not found"));

        return mapToDTO(attendance);
    }

    @Transactional(readOnly = true)
    public List<AttendanceDTO> getAttendanceByStudent(
            Long studentId) {

        return attendanceRepository
                .findByStudentId(studentId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<AttendanceDTO> getAttendanceByCourse(
            Long courseId) {

        return attendanceRepository
                .findByCourseId(courseId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public AttendanceDTO updateAttendance(
            Long id,
            AttendanceDTO dto) {

        Attendance attendance =
                attendanceRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Attendance not found"));

        attendance.setAttendanceDate(
                dto.getAttendanceDate());

        attendance.setStatus(
                Attendance.AttendanceStatus.valueOf(
                        dto.getStatus()));

        attendance.setRemarks(
                dto.getRemarks());

        Attendance updatedAttendance =
                attendanceRepository.save(attendance);

        return mapToDTO(updatedAttendance);
    }

    public void deleteAttendance(
            Long id) {

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

        String studentName =
                attendance.getStudent()
                        .getUser()
                        .getFirstName()
                        + " "
                        + attendance.getStudent()
                        .getUser()
                        .getLastName();

        return AttendanceDTO.builder()
                .id(attendance.getId())
                .studentId(
                        attendance.getStudent().getId())
                .studentName(studentName)
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