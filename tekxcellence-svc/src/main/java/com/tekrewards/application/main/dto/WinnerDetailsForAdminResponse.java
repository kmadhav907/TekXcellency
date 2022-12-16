package com.tekrewards.application.main.dto;

public class WinnerDetailsForAdminResponse {
    private Object data;
    private String status;
    public WinnerDetailsForAdminResponse(Object data, String status) {
        this.data = data;
        this.status = status;
    }

    @Override
    public String toString() {
        return "WinnerDetailsForAdminResponse{" +
                "data=" + data +
                ", status='" + status + '\'' +
                '}';
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
