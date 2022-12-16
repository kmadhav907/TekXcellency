package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Award;
import com.tekrewards.application.main.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AwardRepository extends JpaRepository<Award, Long> {
    Optional<Award> findByAwardName(String awardName);
//    Optional<Award> findByAwardID(Long awardID);
}
