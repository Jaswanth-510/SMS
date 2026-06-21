package com.sms.service;

import com.sms.dto.MarksDTO;
import com.sms.entity.Course;
import com.sms.entity.Marks;
import com.sms.entity.Student;
import com.sms.repository.CourseRepository;
import com.sms.repository.MarksRepository;
import com.sms.repository.StudentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

        Marks marks = Marks.builder()
                .student(student)
                .course(course)
                .marksObtained(dto.getMarksObtained())
                .totalMarks(dto.getTotalMarks())
                .remarks(dto.getRemarks())
                .build();

        return mapToDTO(
                marksRepository.save(marks));
    }

    @Transactional(readOnly = true)
    public List<MarksDTO> getAllMarks() {

        return marksRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public MarksDTO getMarksById(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Marks record not found"));

        return mapToDTO(marks);
    }

    @Transactional(readOnly = true)
    public List<MarksDTO> getMarksByStudent(
            Long studentId) {

        return marksRepository.findByStudent_Id(studentId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MarksDTO> getMarksByCourse(
            Long courseId) {

        return marksRepository.findByCourse_Id(courseId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public MarksDTO updateMarks(
            Long id,
            MarksDTO dto) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Marks not found"));

        marks.setMarksObtained(
                dto.getMarksObtained());

        marks.setTotalMarks(
                dto.getTotalMarks());

        marks.setRemarks(
                dto.getRemarks());

        Marks updatedMarks =
                marksRepository.save(marks);

        return mapToDTO(updatedMarks);
    }

    public void deleteMarks(Long id) {

        Marks marks = marksRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Marks not found"));

        marksRepository.delete(marks);
    }

    private MarksDTO mapToDTO(Marks marks) {

        String studentName =
                marks.getStudent()
                        .getUser()
                        .getFirstName()
                        + " "
                        + marks.getStudent()
                                .getUser()
                                .getLastName();

        return MarksDTO.builder()
                .id(marks.getId())
                .studentId(
                        marks.getStudent().getId())
                .studentName(studentName)
                .courseId(
                        marks.getCourse().getId())
                .courseName(
                        marks.getCourse()
                                .getCourseName())
                .marksObtained(
                        marks.getMarksObtained())
                .totalMarks(
                        marks.getTotalMarks())
                .percentage(
                        marks.getPercentage())
                .grade(
                        marks.getGrade())
                .remarks(
                        marks.getRemarks())
                .build();
    }
}