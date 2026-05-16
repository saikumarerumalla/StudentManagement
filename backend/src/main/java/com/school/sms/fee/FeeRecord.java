package com.school.sms.fee;

import com.school.sms.student.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fee_record")
public class FeeRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String feeType; // e.g., Tuition, Transport, Exam
    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private LocalDate dueDate;
    
    @Enumerated(EnumType.STRING)
    private FeeStatus status;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
