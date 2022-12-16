package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface EmployeeRepository  extends JpaRepository<Employee, Long> {
    Optional<Employee> findByEmail(String email);
    List<Employee> findByManagerId(Long managerId);
    List<Employee> findByDesignationId(Long designationId);

    List<Employee> findTop3ByOrderByRewardPointsDesc();
    Optional<Employee> findByName(String managerName);


}

