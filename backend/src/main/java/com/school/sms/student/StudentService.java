package com.school.sms.student;

import com.school.sms.academic.Section;
import com.school.sms.academic.SectionRepository;
import com.school.sms.user.Role;
import com.school.sms.user.User;
import com.school.sms.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final SectionRepository sectionRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Student enrollStudent(StudentEnrollmentRequest request) {
        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.STUDENT)
                .build();
        user = userRepository.save(user);

        Section section = sectionRepository.findById(request.getSectionId())
                .orElseThrow(() -> new RuntimeException("Section not found"));

        Student student = Student.builder()
                .user(user)
                .admissionNumber(request.getAdmissionNumber())
                .dateOfBirth(request.getDateOfBirth())
                .section(section)
                .build();
        
        return studentRepository.save(student);
    }

    public List<Student> getStudentsBySection(Integer sectionId) {
        return studentRepository.findBySectionId(sectionId);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
