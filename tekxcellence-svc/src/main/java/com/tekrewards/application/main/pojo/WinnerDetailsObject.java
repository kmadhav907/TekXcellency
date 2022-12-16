package com.tekrewards.application.main.pojo;

public class WinnerDetailsObject {
    private Long id;
    private Long employeeId;
    private Long awardId;
    private Double pointsGained;

    public WinnerDetailsObject(Long id, Long employeeId, Long awardId, Double pointsGained) {
        this.id = id;
        this.employeeId = employeeId;
        this.awardId = awardId;
        this.pointsGained = pointsGained;
    }

    public WinnerDetailsObject() {
    }

    @Override
    public String toString() {
        return "WinnerDetailsObject{" +
                "id=" + id +
                ", employeeId=" + employeeId +
                ", awardId=" + awardId +
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

    public Double getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(Double pointsGained) {
        this.pointsGained = pointsGained;
    }
}
