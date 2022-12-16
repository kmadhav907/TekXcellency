package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DesignationRepository extends JpaRepository<Designation, Long> {
    Optional<Designation> findByDesignationName(String name);
}
