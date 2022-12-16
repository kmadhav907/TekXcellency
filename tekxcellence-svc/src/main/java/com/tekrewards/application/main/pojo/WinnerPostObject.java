package com.tekrewards.application.main.pojo;

public class WinnerPostObject {
    private String employeeName;
    private Double pointsGained;

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Double getPointsGained() {
        return pointsGained;
    }

    public void setPointsGained(Double pointsGained) {
        this.pointsGained = pointsGained;
    }

    @Override
    public String toString() {
        return "WinnerPostObject{" +
                "employeeName='" + employeeName + '\'' +
                ", pointsGained=" + pointsGained +
                '}';
    }

    public WinnerPostObject() {
    }
}
