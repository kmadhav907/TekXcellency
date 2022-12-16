package com.tekrewards.application.main.dto;

public class UpdateProfileDetailsResponse {
    private String status;
    private Object message;

    public UpdateProfileDetailsResponse(String status, Object message) {
        this.status = status;
        this.message = message;
    }

    @Override
    public String toString() {
        return "UpdateProfileDetailsResponse{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                '}';
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
