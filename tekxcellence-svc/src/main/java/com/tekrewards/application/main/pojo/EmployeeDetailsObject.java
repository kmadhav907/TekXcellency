package com.tekrewards.application.main.pojo;

public class EmployeeDetailsObject {
    private String designation;
    private String name;
    private String email;

    private Long id;
    private String practise;

    public EmployeeDetailsObject() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    private Long managerId;

    public EmployeeDetailsObject(String designation, String name, String email, String practise, Long employeeId, Long managerId) {
        this.designation = designation;
        this.name = name;
        this.email = email;
        this.practise = practise;
        this.id = employeeId;
        this.managerId = managerId;
    }

    @Override
    public String toString() {
        return "EmployeeDetailsObject{" +
                "designation='" + designation + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", practise='" + practise + '\'' +
                '}';
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPractise() {
        return practise;
    }

    public void setPractise(String practise) {
        this.practise = practise;
    }
}
