package com.sms.service;

import com.sms.dto.CourseDTO;
import com.sms.entity.Course;
import com.sms.repository.CourseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Transactional
    public CourseDTO createCourse(CourseDTO courseDTO) {
        Course course = Course.builder()
                .courseCode(courseDTO.getCourseCode())
                .courseName(courseDTO.getCourseName())
                .credits(courseDTO.getCredits())
                .semester(courseDTO.getSemester())
                .description(courseDTO.getDescription())
                .maxStudents(courseDTO.getMaxStudents())
                .build();

        Course savedCourse = courseRepository.save(course);
        return mapToDTO(savedCourse);
    }

    public CourseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return mapToDTO(course);
    }

    public List<CourseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<CourseDTO> getCoursesBySemester(String semester) {
        return courseRepository.findBySemester(semester).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CourseDTO updateCourse(Long id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setCourseName(courseDTO.getCourseName());
        course.setCredits(courseDTO.getCredits());
        course.setSemester(courseDTO.getSemester());
        course.setDescription(courseDTO.getDescription());
        course.setMaxStudents(courseDTO.getMaxStudents());

        Course updatedCourse = courseRepository.save(course);
        return mapToDTO(updatedCourse);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setIsActive(false);
        courseRepository.save(course);
    }

    private CourseDTO mapToDTO(Course course) {
        return CourseDTO.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .courseName(course.getCourseName())
                .credits(course.getCredits())
                .semester(course.getSemester())
                .description(course.getDescription())
                .maxStudents(course.getMaxStudents())
                .isActive(course.getIsActive())
                .build();
    }
}
