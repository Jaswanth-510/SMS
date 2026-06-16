package com.sms.repository;

import com.sms.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarksRepository extends JpaRepository<Marks, Long> {
    List<Marks> findByStudentId(Long studentId);
    List<Marks> findByStudentIdAndCourseId(Long studentId, Long courseId);
    List<Marks> findByCourseId(Long courseId);
}
