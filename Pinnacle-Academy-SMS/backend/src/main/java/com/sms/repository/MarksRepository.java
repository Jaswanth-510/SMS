package com.sms.repository;

import com.sms.entity.Marks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MarksRepository
        extends JpaRepository<Marks, Long> {

    List<Marks> findByStudent_Id(
            Long studentId);

    List<Marks> findByCourse_Id(
            Long courseId);

    List<Marks> findByStudent_IdAndCourse_Id(
            Long studentId,
            Long courseId);
}