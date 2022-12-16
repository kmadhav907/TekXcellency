package com.tekrewards.application.main.repositories;

import com.tekrewards.application.main.models.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, Long> {
   Optional<Vote> findByVotedByIdAndVotedToId(Long votedById, Long votedToId);
   List<Vote> findByAwardId(Long awardId);
}
