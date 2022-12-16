package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.EmployeeRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<EmployeeRegistration,Long> {

    EmployeeRegistration findByemail(String email);
}
