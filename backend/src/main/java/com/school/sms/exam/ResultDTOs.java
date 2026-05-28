package com.school.sms.exam;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class StudentResultSummary {
    private String studentName;
    private String admissionNumber;
    private List<GradeDetail> grades;
    private Double averagePercentage;
}

@Data
@Builder
class GradeDetail {
    private String examName;
    private String subjectName;
    private Integer marksObtained;
    private Integer maxMarks;
    private Double percentage;
}

@Data
@Builder
class SectionResultSummary {
    private String className;
    private String sectionName;
    private List<StudentPerformance> studentPerformances;
}

@Data
@Builder
class StudentPerformance {
    private String studentName;
    private Double averagePercentage;
    private Integer rank; // Optional enhancement
}
