package com.sms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long id;
    private String courseCode;
    private String courseName;
    private Integer credits;
    private String semester;
    private String description;
    private Integer maxStudents;
    private Boolean isActive;
}
