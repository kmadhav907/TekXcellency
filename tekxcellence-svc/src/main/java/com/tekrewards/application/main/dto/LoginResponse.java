package com.tekrewards.application.main.dto;

public class LoginResponse {
    private String status;
    private Object message;
    public LoginResponse(){}
    public LoginResponse(String status, Object message){
        this.message = message;
        this.status = status;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
