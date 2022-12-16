package com.tekrewards.application.main.dto;

import com.tekrewards.application.main.models.Feedback;
import com.tekrewards.application.main.pojo.AdminFeedbackInfo;

import  java.util.List;
public class AdminFeedbackResponse {


    private String status;
    private Long totalNumberOfFeedback;

    private  List<Feedback> feedbackList;

    public List<Feedback> getFeedbackList() {
        return feedbackList;
    }

    public void setFeedbackList(List<Feedback> feedbackList) {
        this.feedbackList = feedbackList;
    }

    public AdminFeedbackResponse() {
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getTotalNumberOfFeedback() {
        return totalNumberOfFeedback;
    }

    public void setTotalNumberOfFeedback(Long totalNumberOfFeedback) {
        this.totalNumberOfFeedback = totalNumberOfFeedback;
    }
}
