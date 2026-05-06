package com.school.sms.academic;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicService {

    private final ClassLevelRepository classLevelRepository;
    private final SectionRepository sectionRepository;
    private final SubjectRepository subjectRepository;

    // ClassLevel methods
    public ClassLevel createClassLevel(ClassLevel classLevel) {
        return classLevelRepository.save(classLevel);
    }

    public List<ClassLevel> getAllClassLevels() {
        return classLevelRepository.findAll();
    }

    // Section methods
    public Section createSection(Integer classLevelId, Section section) {
        ClassLevel classLevel = classLevelRepository.findById(classLevelId)
                .orElseThrow(() -> new RuntimeException("Class level not found"));
        section.setClassLevel(classLevel);
        return sectionRepository.save(section);
    }

    public List<Section> getSectionsByClass(Integer classLevelId) {
        return sectionRepository.findByClassLevelId(classLevelId);
    }

    // Subject methods
    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
}
