package com.school.sms.student;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentEnrollmentRequest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String admissionNumber;
    private LocalDate dateOfBirth;
    private Integer sectionId;
}
