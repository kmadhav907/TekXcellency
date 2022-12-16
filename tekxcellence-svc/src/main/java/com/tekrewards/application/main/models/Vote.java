package com.tekrewards.application.main.models;

import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="vote")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="vote_id")
    private  Long id;

    @Column(name = "voted_by_id")
    private Long votedById;

    @Override
    public String toString() {
        return "Vote{" +
                "id=" + id +
                ", votedById=" + votedById +
                ", votedToId=" + votedToId +
                ", awardId=" + awardId +
                ", pointsGained=" + pointsGained +
                ", feedback='" + feedback + '\'' +
                ", managerId=" + managerId +
                ", createdAt=" + createdAt +
                '}';
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    @Column(name="voted_to_id")
    private  Long votedToId;
    @Column(name="award_id")
    private Long awardId;

    @Column(name="points_gained")
    private Double pointsGained;
    @Column(name="feedback")
    private String feedback;

    @Column(name="manager_id")
    private Long managerId;
    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    public Long getAwardId() {
        return awardId;
    }

    public void setAwardId(Long awardId) {
        this.awardId = awardId;
    }

    public Double getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(Double pointsGained) {
        this.pointsGained = pointsGained;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getVotedById() {
        return votedById;
    }

    public void setVotedById(Long votedById) {
        this.votedById = votedById;
    }

    public Long getVotedToId() {
        return votedToId;
    }

    public void setVotedToId(Long votedToId) {
        this.votedToId = votedToId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
