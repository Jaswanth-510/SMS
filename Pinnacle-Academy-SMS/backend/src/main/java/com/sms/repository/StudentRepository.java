package com.sms.repository;

import com.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    // Find by enrollment number
    Optional<Student> findByEnrollmentNumber(String enrollmentNumber);

    // Find student by user ID
    Optional<Student> findByUserId(Long userId);

    // Find students by class
    List<Student> findByClassName(String className);

    // Find students by class and section
    List<Student> findByClassNameAndSection(
            String className,
            String section);

    // Active students only
    List<Student> findByIsActiveTrue();

    // Search by first name
    List<Student> findByUserFirstNameContainingIgnoreCase(
            String firstName);

    // Search by last name
    List<Student> findByUserLastNameContainingIgnoreCase(
            String lastName);

    // Search by class name
    List<Student> findByClassNameContainingIgnoreCase(
            String className);

    // Pagination support
    Page<Student> findAll(Pageable pageable);
}