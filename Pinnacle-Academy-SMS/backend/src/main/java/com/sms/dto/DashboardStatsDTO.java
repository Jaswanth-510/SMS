package com.sms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsDTO {

    private long totalStudents;
    private long totalTeachers;
    private long totalCourses;
    private long totalAttendance;
    private long totalMarks;
}