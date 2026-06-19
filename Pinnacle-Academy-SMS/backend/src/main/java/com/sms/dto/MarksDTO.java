package com.sms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarksDTO {

    private Long id;

    private Long studentId;
    private String studentName;

    private Long courseId;
    private String courseName;

    private Double marksObtained;
    private Double totalMarks;

    private Double percentage;
    private String grade;

    private String remarks;
}