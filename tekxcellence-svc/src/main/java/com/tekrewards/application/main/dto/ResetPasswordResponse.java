package com.tekrewards.application.main.dto;

public class ResetPasswordResponse {
    private String status;
    private String message;

    public ResetPasswordResponse() {
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
