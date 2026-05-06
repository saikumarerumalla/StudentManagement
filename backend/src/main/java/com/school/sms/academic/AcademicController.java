package com.school.sms.academic;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/academic")
@RequiredArgsConstructor
public class AcademicController {

    private final AcademicService service;

    @PostMapping("/classes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClassLevel> createClass(@RequestBody ClassLevel classLevel) {
        return ResponseEntity.ok(service.createClassLevel(classLevel));
    }

    @GetMapping("/classes")
    public ResponseEntity<List<ClassLevel>> getAllClasses() {
        return ResponseEntity.ok(service.getAllClassLevels());
    }

    @PostMapping("/classes/{classId}/sections")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Section> createSection(
            @PathVariable Integer classId,
            @RequestBody Section section
    ) {
        return ResponseEntity.ok(service.createSection(classId, section));
    }

    @GetMapping("/classes/{classId}/sections")
    public ResponseEntity<List<Section>> getSections(@PathVariable Integer classId) {
        return ResponseEntity.ok(service.getSectionsByClass(classId));
    }

    @PostMapping("/subjects")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(service.createSubject(subject));
    }

    @GetMapping("/subjects")
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(service.getAllSubjects());
    }
}
