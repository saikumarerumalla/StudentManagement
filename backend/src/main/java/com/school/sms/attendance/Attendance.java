package com.school.sms.attendance;

import com.school.sms.student.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "attendance", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "date"})
})
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDate date;

    @Enumerated(EnumType.STRING)
    private AttendanceStatus status;

    private String remarks;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;
}
