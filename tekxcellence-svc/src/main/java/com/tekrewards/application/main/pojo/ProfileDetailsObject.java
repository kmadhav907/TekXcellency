package com.tekrewards.application.main.pojo;

public class ProfileDetailsObject {
    private Long id;
    private Long managerId;
    private String name;
    private String email;
    private String phoneNumber;
    private String gender;
    private String designation;
    private String practise;

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    private String profilePicUrl;

    public ProfileDetailsObject(Long employeeId, Long managerId, String name, String email, String phoneNumber, String gender, String designation, String practise, String profilePicUrl) {
        this.id = employeeId;
        this.profilePicUrl = profilePicUrl;
        this.managerId = managerId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.designation = designation;
        this.practise = practise;
    }

    @Override
    public String toString() {
        return "ProfileDetailsObject{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", designation='" + designation + '\'' +
                ", practise='" + practise + '\'' +
                '}';
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getPractise() {
        return practise;
    }

    public void setPractise(String practise) {
        this.practise = practise;
    }
}
