package com.tekrewards.application.main.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="winners")
public class Winner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="winner_id")
    private Long id;

    @Column(name="employee_id")
    private Long employeeId;

    @Column(name="award_id")
    private Long awardId;

    @CreationTimestamp
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    @UpdateTimestamp
    private LocalDateTime updateDateTime;

    @Column(name="points_gained")
    private Double pointsGained;

    public Winner() {
    }

    @Override
    public String toString() {
        return "Winner{" +
                "id=" + id +
                ", employeeId=" + employeeId +
                ", awardId=" + awardId +
                ", createdAt=" + createdAt +
                ", updateDateTime=" + updateDateTime +
                ", pointsGained=" + pointsGained +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Long getAwardId() {
        return awardId;
    }

    public void setAwardId(Long awardId) {
        this.awardId = awardId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdateDateTime() {
        return updateDateTime;
    }

    public void setUpdateDateTime(LocalDateTime updateDateTime) {
        this.updateDateTime = updateDateTime;
    }

    public Double getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(Double pointsGained) {
        this.pointsGained = pointsGained;
    }
}
