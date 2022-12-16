package com.tekrewards.application.main.dto;

import com.tekrewards.application.main.pojo.AdminEmployeeInfo;

import java.util.List;

public class AdminEmployeeResponse {
    private List<AdminEmployeeInfo> employeeList;
    private String status;

    private Long totalNumberOfEmployees;

    public AdminEmployeeResponse(){

    }

    public List<AdminEmployeeInfo> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<AdminEmployeeInfo> employeeList) {
        this.employeeList = employeeList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTotalNumberOfEmployees() {
        return totalNumberOfEmployees;
    }

    public void setTotalNumberOfEmployees(Long totalNumberOfEmployees) {
        this.totalNumberOfEmployees = totalNumberOfEmployees;
    }
}
