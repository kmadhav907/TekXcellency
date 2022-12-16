package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
