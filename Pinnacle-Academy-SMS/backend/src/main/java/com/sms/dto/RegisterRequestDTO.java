package com.sms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private String rollNumber;
    private String className;
    private String section;
    private String phoneNumber;
    private String employeeId;
    private String specialization;
    private String qualifications;
    private String department;
}