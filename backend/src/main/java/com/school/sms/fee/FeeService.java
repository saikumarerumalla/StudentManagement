package com.school.sms.fee;

import com.school.sms.student.Student;
import com.school.sms.student.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FeeService {

    private final FeeRecordRepository feeRepository;
    private final StudentRepository studentRepository;

    public FeeRecord createFeeRecord(Integer studentId, FeeRecord feeRecord) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        feeRecord.setStudent(student);
        if (feeRecord.getPaidAmount() == null) feeRecord.setPaidAmount(BigDecimal.ZERO);
        updateFeeStatus(feeRecord);
        return feeRepository.save(feeRecord);
    }

    public List<FeeRecord> getStudentFees(Integer studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    public FeeRecord recordPayment(Integer feeId, BigDecimal amount) {
        FeeRecord record = feeRepository.findById(feeId)
                .orElseThrow(() -> new RuntimeException("Fee record not found"));
        record.setPaidAmount(record.getPaidAmount().add(amount));
        updateFeeStatus(record);
        return feeRepository.save(record);
    }

    private void updateFeeStatus(FeeRecord record) {
        if (record.getPaidAmount().compareTo(BigDecimal.ZERO) == 0) {
            record.setStatus(FeeStatus.PENDING);
        } else if (record.getPaidAmount().compareTo(record.getTotalAmount()) >= 0) {
            record.setStatus(FeeStatus.PAID);
        } else {
            record.setStatus(FeeStatus.PARTIAL);
        }
    }
}
