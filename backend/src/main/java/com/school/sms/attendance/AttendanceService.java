package com.school.sms.attendance;

import com.school.sms.student.Student;
import com.school.sms.student.StudentRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    @Transactional
    public void markAttendance(LocalDate date, Integer sectionId, List<AttendanceRecordRequest> records) {
        for (AttendanceRecordRequest record : records) {
            Student student = studentRepository.findById(record.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Attendance attendance = Attendance.builder()
                    .date(date)
                    .student(student)
                    .status(record.getStatus())
                    .remarks(record.getRemarks())
                    .build();
            
            // In a real app, we should check if record exists and update it
            attendanceRepository.save(attendance);
        }
    }

    public List<Attendance> getDailyAttendance(LocalDate date, Integer sectionId) {
        return attendanceRepository.findByDateAndStudentSectionId(date, sectionId);
    }
}

@Data
class AttendanceRecordRequest {
    private Integer studentId;
    private AttendanceStatus status;
    private String remarks;
}
