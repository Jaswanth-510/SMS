package com.sms.service;

import com.sms.dto.DashboardStatsDTO;
import com.sms.repository.*;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final AttendanceRepository attendanceRepository;
    private final MarksRepository marksRepository;

    public DashboardService(
            StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            CourseRepository courseRepository,
            AttendanceRepository attendanceRepository,
            MarksRepository marksRepository) {

        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.attendanceRepository = attendanceRepository;
        this.marksRepository = marksRepository;
    }

    public DashboardStatsDTO getStats() {

        return DashboardStatsDTO.builder()
                .totalStudents(studentRepository.count())
                .totalTeachers(teacherRepository.count())
                .totalCourses(courseRepository.count())
                .totalAttendance(attendanceRepository.count())
                .totalMarks(marksRepository.count())
                .build();
    }
}