package com.school.sms.exam;

import com.school.sms.academic.Section;
import com.school.sms.academic.SectionRepository;
import com.school.sms.academic.Subject;
import com.school.sms.academic.SubjectRepository;
import com.school.sms.student.Student;
import com.school.sms.student.StudentRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final GradeRepository gradeRepository;
    private final SubjectRepository subjectRepository;
    private final SectionRepository sectionRepository;
    private final StudentRepository studentRepository;

    public Exam scheduleExam(ExamScheduleRequest request) {
        Subject subject = subjectRepository.findById(request.getSubjectId())
                .orElseThrow(() -> new RuntimeException("Subject not found"));
        Section section = sectionRepository.findById(request.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Exam exam = Exam.builder()
                .name(request.getName())
                .date(request.getDate())
                .maxMarks(request.getMaxMarks())
                .subject(subject)
                .section(section)
                .build();
        
        return examRepository.save(exam);
    }

    public List<Exam> getExamsBySection(Integer sectionId) {
        return examRepository.findBySectionId(sectionId);
    }

    @Transactional
    public void recordGrades(Integer examId, List<GradeEntryRequest> grades) {
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        for (GradeEntryRequest entry : grades) {
            Student student = studentRepository.findById(entry.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Student not found"));

            Grade grade = Grade.builder()
                    .exam(exam)
                    .student(student)
                    .marksObtained(entry.getMarksObtained())
                    .remarks(entry.getRemarks())
                    .build();
            
            gradeRepository.save(grade);
        }
    }

    public List<Grade> getStudentGrades(Integer studentId) {
        return gradeRepository.findByStudentId(studentId);
    }

    public StudentResultSummary getStudentResultSummary(Integer studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        List<Grade> grades = gradeRepository.findByStudentId(studentId);
        
        List<GradeDetail> details = grades.stream().map(g -> GradeDetail.builder()
                .examName(g.getExam().getName())
                .subjectName(g.getExam().getSubject().getName())
                .marksObtained(g.getMarksObtained())
                .maxMarks(g.getExam().getMaxMarks())
                .percentage((g.getMarksObtained() * 100.0) / g.getExam().getMaxMarks())
                .build()
        ).toList();

        Double avg = details.stream().mapToDouble(GradeDetail::getPercentage).average().orElse(0.0);

        return StudentResultSummary.builder()
                .studentName(student.getUser().getFirstname() + " " + student.getUser().getLastname())
                .admissionNumber(student.getAdmissionNumber())
                .grades(details)
                .averagePercentage(avg)
                .build();
    }

    public SectionResultSummary getSectionResultSummary(Integer sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        List<Student> students = studentRepository.findBySectionId(sectionId);
        
        List<StudentPerformance> performances = students.stream().map(s -> {
            List<Grade> studentGrades = gradeRepository.findByStudentId(s.getId());
            Double avg = studentGrades.stream()
                    .mapToDouble(g -> (g.getMarksObtained() * 100.0) / g.getExam().getMaxMarks())
                    .average().orElse(0.0);
            
            return StudentPerformance.builder()
                    .studentName(s.getUser().getFirstname() + " " + s.getUser().getLastname())
                    .averagePercentage(avg)
                    .build();
        }).toList();

        return SectionResultSummary.builder()
                .className(section.getClassLevel().getName())
                .sectionName(section.getName())
                .studentPerformances(performances)
                .build();
    }
}

@Data
class ExamScheduleRequest {
    private String name;
    private java.time.LocalDate date;
    private Integer maxMarks;
    private Integer subjectId;
    private Integer sectionId;
}

@Data
class GradeEntryRequest {
    private Integer studentId;
    private Integer marksObtained;
    private String remarks;
}
