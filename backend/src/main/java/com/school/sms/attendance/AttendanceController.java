package com.school.sms.attendance;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService service;

    @PostMapping("/mark")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<Void> markAttendance(@RequestBody AttendanceBatchRequest request) {
        service.markAttendance(request.getDate(), request.getSectionId(), request.getRecords());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/daily")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<List<Attendance>> getDailyAttendance(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam Integer sectionId
    ) {
        return ResponseEntity.ok(service.getDailyAttendance(date, sectionId));
    }
}

@Data
class AttendanceBatchRequest {
    private LocalDate date;
    private Integer sectionId;
    private List<AttendanceRecordRequest> records;
}
