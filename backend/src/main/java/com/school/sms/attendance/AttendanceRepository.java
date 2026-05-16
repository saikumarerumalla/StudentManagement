package com.school.sms.attendance;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByStudentIdAndDateBetween(Integer studentId, LocalDate startDate, LocalDate endDate);
    List<Attendance> findByDateAndStudentSectionId(LocalDate date, Integer sectionId);
}
