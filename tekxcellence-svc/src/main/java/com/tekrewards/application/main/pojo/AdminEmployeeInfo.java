package com.tekrewards.application.main.pojo;



public class AdminEmployeeInfo {
    private String employeeName;
    private String practiseName;
    private Long employeeId;
    private String employeeEmail;

    public AdminEmployeeInfo(){

    }
    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }



    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getPractiseName() {
        return practiseName;
    }

    public void setPractiseName(String practiseName) {
        this.practiseName = practiseName;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }
}
