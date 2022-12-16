package com.tekrewards.application.main.dto;

public class FeedbackResponse {
    private String status;
    private Object message;

    public FeedbackResponse() {
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

    public void setMessage(Object message) {
        this.message = message;
    }
}
