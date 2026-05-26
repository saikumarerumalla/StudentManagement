package com.school.sms.student;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;

    @PostMapping("/enroll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> enrollStudent(@RequestBody StudentEnrollmentRequest request) {
        return ResponseEntity.ok(service.enrollStudent(request));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(service.getAllStudents());
    }

    @GetMapping("/section/{sectionId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'TEACHER')")
    public ResponseEntity<List<Student>> getStudentsBySection(@PathVariable Integer sectionId) {
        return ResponseEntity.ok(service.getStudentsBySection(sectionId));
    }
}
