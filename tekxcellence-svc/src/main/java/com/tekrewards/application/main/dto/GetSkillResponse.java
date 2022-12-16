package com.tekrewards.application.main.dto;

public class GetSkillResponse {
    private String status;
    private Object data;

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

    public GetSkillResponse(String status, Object data) {
        this.status = status;
        this.data = data;
    }
}
