package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Practice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PracticeRepository extends JpaRepository<Practice, Long> {
    Optional<Practice> findByPractiseName(String practiseName);
}
