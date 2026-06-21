package com.sms.service;

import com.sms.dto.DashboardStatsDTO;
import com.sms.repository.AttendanceRepository;
import com.sms.repository.CourseRepository;
import com.sms.repository.FeeRepository;
import com.sms.repository.MarksRepository;
import com.sms.repository.StudentRepository;
import com.sms.repository.TeacherRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final CourseRepository courseRepository;
    private final AttendanceRepository attendanceRepository;
    private final MarksRepository marksRepository;
    private final FeeRepository feeRepository;

    public DashboardService(
            StudentRepository studentRepository,
            TeacherRepository teacherRepository,
            CourseRepository courseRepository,
            AttendanceRepository attendanceRepository,
            MarksRepository marksRepository,
            FeeRepository feeRepository) {

        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.courseRepository = courseRepository;
        this.attendanceRepository = attendanceRepository;
        this.marksRepository = marksRepository;
        this.feeRepository = feeRepository;
    }

    public DashboardStatsDTO getStats() {

        return DashboardStatsDTO.builder()
                .totalStudents(studentRepository.count())
                .activeStudents(
                        studentRepository.findByIsActiveTrue().size())
                .totalTeachers(teacherRepository.count())
                .totalCourses(courseRepository.count())
                .totalAttendance(attendanceRepository.count())
                .totalMarks(marksRepository.count())
                .totalFees(feeRepository.count())
                .build();
    }
}