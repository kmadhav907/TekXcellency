package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Skills;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skills, Long> {
}
