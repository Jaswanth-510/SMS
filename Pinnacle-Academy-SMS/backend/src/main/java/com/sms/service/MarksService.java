package com.sms.service;

import com.sms.dto.MarksDTO;
import com.sms.entity.Course;
import com.sms.entity.Marks;
import com.sms.entity.Student;
import com.sms.repository.CourseRepository;
import com.sms.repository.MarksRepository;
import com.sms.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MarksService {

    private final MarksRepository marksRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;

    public MarksService(
            MarksRepository marksRepository,
            StudentRepository studentRepository,
            CourseRepository courseRepository) {

        this.marksRepository = marksRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    public MarksDTO createMarks(MarksDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Marks marks = Marks.builder()
                .student(student)
                .course(course)
                .marksObtained(dto.getMarksObtained())
                .totalMarks(dto.getTotalMarks())
                .remarks(dto.getRemarks())
                .build();

        Marks savedMarks = marksRepository.save(marks);

        return mapToDTO(savedMarks);
    }

    public List<MarksDTO> getAllMarks() {
        return marksRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public MarksDTO getMarksById(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Marks record not found"));

        return mapToDTO(marks);
    }

    private MarksDTO mapToDTO(Marks marks) {

        String studentName =
                marks.getStudent().getUser().getFirstName()
                        + " "
                        + marks.getStudent().getUser().getLastName();

        return MarksDTO.builder()
                .id(marks.getId())
                .studentId(marks.getStudent().getId())
                .studentName(studentName)
                .courseId(marks.getCourse().getId())
                .courseName(marks.getCourse().getCourseName())
                .marksObtained(marks.getMarksObtained())
                .totalMarks(marks.getTotalMarks())
                .percentage(marks.getPercentage())
                .grade(marks.getGrade())
                .remarks(marks.getRemarks())
                .build();
    }
}