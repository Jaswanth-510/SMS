package com.sms.repository;

import com.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);
    Optional<Student> findByUserId(Long userId);
    List<Student> findByClassName(String className);
    List<Student> findByClassNameAndSection(String className, String section);
    List<Student> findByIsActiveTrue();
}
