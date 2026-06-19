package com.sms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {

    private Long id;

    private Long studentId;
    private String studentName;

    private Long courseId;
    private String courseName;

    private LocalDate attendanceDate;

    private String status;

    private String remarks;
}