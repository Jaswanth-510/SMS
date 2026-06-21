package com.sms.repository;

import com.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository
        extends JpaRepository<Student, Long> {

    Optional<Student> findByEnrollmentNumber(
            String enrollmentNumber);

    Optional<Student> findByUserId(
            Long userId);

    List<Student> findByClassName(
            String className);

    List<Student> findByClassNameAndSection(
            String className,
            String section);

    List<Student> findByIsActiveTrue();

    long countByIsActiveTrue();

    List<Student> findByUserFirstNameContainingIgnoreCase(
            String firstName);

    List<Student> findByUserLastNameContainingIgnoreCase(
            String lastName);

    List<Student> findByClassNameContainingIgnoreCase(
            String className);

    Page<Student> findAll(
            Pageable pageable);
}