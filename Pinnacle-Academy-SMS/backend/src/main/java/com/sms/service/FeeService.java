package com.sms.service;

import com.sms.dto.FeeDTO;
import com.sms.entity.Fee;
import com.sms.entity.Student;
import com.sms.repository.FeeRepository;
import com.sms.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FeeService {

    private final FeeRepository feeRepository;
    private final StudentRepository studentRepository;

    public FeeService(FeeRepository feeRepository,
                      StudentRepository studentRepository) {
        this.feeRepository = feeRepository;
        this.studentRepository = studentRepository;
    }

    public FeeDTO createFee(FeeDTO dto) {

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Fee fee = Fee.builder()
                .student(student)
                .totalAmount(dto.getTotalAmount())
                .paidAmount(dto.getPaidAmount())
                .dueDate(dto.getDueDate())
                .build();

        return mapToDTO(feeRepository.save(fee));
    }

    public List<FeeDTO> getAllFees() {
        return feeRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public FeeDTO getFeeById(Long id) {

        Fee fee = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee not found"));

        return mapToDTO(fee);
    }

    private FeeDTO mapToDTO(Fee fee) {

        String studentName =
                fee.getStudent().getUser().getFirstName()
                        + " "
                        + fee.getStudent().getUser().getLastName();

        return FeeDTO.builder()
                .id(fee.getId())
                .studentId(fee.getStudent().getId())
                .studentName(studentName)
                .totalAmount(fee.getTotalAmount())
                .paidAmount(fee.getPaidAmount())
                .pendingAmount(fee.getPendingAmount())
                .status(fee.getStatus())
                .dueDate(fee.getDueDate())
                .build();
    }
}