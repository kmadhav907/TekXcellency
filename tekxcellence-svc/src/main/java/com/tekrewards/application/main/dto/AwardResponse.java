package com.tekrewards.application.main.dto;

public class AwardResponse {
    private String status;
    private Object data;

    public AwardResponse(String status, Object data) {
        this.status = status;
        this.data = data;
    }
    public AwardResponse(){

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
