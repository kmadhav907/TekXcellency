package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Employee;
import com.tekrewards.application.main.models.Winner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WinnerRepository extends JpaRepository<Winner, Long> {
    List<Winner> findByAwardId(Long awardId);
}
