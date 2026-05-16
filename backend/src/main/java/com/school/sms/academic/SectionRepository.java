package com.school.sms.academic;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Integer> {
    List<Section> findByClassLevelId(Integer classLevelId);
}
