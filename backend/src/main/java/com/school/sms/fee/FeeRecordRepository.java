package com.school.sms.fee;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeeRecordRepository extends JpaRepository<FeeRecord, Integer> {
    List<FeeRecord> findByStudentId(Integer studentId);
}
