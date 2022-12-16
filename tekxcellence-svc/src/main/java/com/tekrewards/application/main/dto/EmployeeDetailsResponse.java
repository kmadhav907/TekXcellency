package com.tekrewards.application.main.dto;

public class EmployeeDetailsResponse {
    private String status;
    private Object data;

    public EmployeeDetailsResponse(String message, Object data) {
        this.status = message;
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
