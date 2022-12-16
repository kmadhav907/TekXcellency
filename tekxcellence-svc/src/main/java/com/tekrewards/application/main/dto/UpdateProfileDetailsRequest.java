package com.tekrewards.application.main.dto;

public class UpdateProfileDetailsRequest {
    private long id;
    private String phoneNumber;
    private String name;
    private String gender;

    public UpdateProfileDetailsRequest() {
    }

    @Override
    public String toString() {
        return "UpdateProfileDetailsRequest{" +
                "id=" + id +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", name='" + name + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
