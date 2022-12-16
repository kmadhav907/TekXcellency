package com.tekrewards.application.main.pojo;

public class EmployeeDetailsForVoting {
    private String designationName;
    private String employeeName;
    private String employeeEmail;
    private Long id;

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public String getEmployeeEmail() {
        return employeeEmail;
    }

    public void setEmployeeEmail(String employeeEmail) {
        this.employeeEmail = employeeEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmployeeDetailsForVoting(String designationName, String employeeName, String employeeEmail, Long id) {
        this.designationName = designationName;
        this.employeeName = employeeName;
        this.employeeEmail = employeeEmail;
        this.id = id;
    }
}
