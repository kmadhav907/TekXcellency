package com.tekrewards.application.main.dto;

public class PracticeResponse {
    private String status;
    private Object data;
    public PracticeResponse(){

    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
