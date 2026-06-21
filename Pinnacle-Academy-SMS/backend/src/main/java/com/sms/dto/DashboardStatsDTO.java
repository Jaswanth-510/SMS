package com.sms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {

    private long totalStudents;

    private long activeStudents;

    private long totalTeachers;

    private long totalCourses;

    private long totalAttendance;

    private long totalMarks;

    private long totalFees;

    private long paidFees;

    private long pendingFees;
}