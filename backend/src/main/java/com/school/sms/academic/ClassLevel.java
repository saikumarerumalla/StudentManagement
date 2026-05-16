package com.school.sms.academic;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "class_level")
public class ClassLevel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(unique = true)
    private String name; // e.g., Grade 10

    @OneToMany(mappedBy = "classLevel", cascade = CascadeType.ALL)
    private List<Section> sections;
}
