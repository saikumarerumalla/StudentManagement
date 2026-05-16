package com.school.sms.exam;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService service;

    @PostMapping("/schedule")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Exam> scheduleExam(@RequestBody ExamScheduleRequest request) {
        return ResponseEntity.ok(service.scheduleExam(request));
    }

    @GetMapping("/section/{sectionId}")
    public ResponseEntity<List<Exam>> getExams(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(service.getExamsBySection(sectionId));
    }

    @PostMapping("/{examId}/grades")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<Void> recordGrades(
            @PathVariable Integer examId,
            @RequestBody List<GradeEntryRequest> grades
    ) {
        service.recordGrades(examId, grades);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/student/{studentId}/summary")
    public ResponseEntity<StudentResultSummary> getStudentSummary(@PathVariable Integer studentId) {
        return ResponseEntity.ok(service.getStudentResultSummary(studentId));
    }

    @GetMapping("/section/{sectionId}/summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<SectionResultSummary> getSectionSummary(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(service.getSectionResultSummary(sectionId));
    }
}
