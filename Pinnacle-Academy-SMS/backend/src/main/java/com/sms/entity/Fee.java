package com.sms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private Double paidAmount;

    @Column(nullable = false)
    private Double pendingAmount;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDate dueDate;

    @PrePersist
    @PreUpdate
    public void calculateFeeStatus() {

        if (totalAmount != null && paidAmount != null) {
            pendingAmount = totalAmount - paidAmount;

            if (pendingAmount <= 0) {
                status = "PAID";
            } else {
                status = "PENDING";
            }
        }
    }
}