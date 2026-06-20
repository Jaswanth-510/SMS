package com.sms.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeeDTO {

    private Long id;

    private Long studentId;
    private String studentName;

    private Double totalAmount;
    private Double paidAmount;
    private Double pendingAmount;

    private String status;

    private LocalDate dueDate;
}