package com.sms.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private Long id;
    private Long userId;

    private String email;
    private String firstName;
    private String lastName;
    private String enrollmentNumber;
    private String rollNumber;
    private String className;
    private String section;
    private LocalDate dateOfBirth;
    private String phoneNumber;
    private String address;
    private String parentName;
    private String parentPhone;
    private LocalDate enrollmentDate;
    private Double gpa;
    private Boolean isActive;

    public Long getUserId() {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}