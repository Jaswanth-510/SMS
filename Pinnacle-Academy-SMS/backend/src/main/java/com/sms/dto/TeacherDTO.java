package com.sms.dto;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String employeeId;
    private String specialization;
    private String qualifications;
    private String department;
    private LocalDate joinDate;
    private String phoneNumber;
    private String address;
    private Boolean isActive;
}
