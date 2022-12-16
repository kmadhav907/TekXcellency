package com.tekrewards.application.main.pojo;

public class AdminFeedbackInfo {
    private int id;
    private String name;
    private String email;
    private String feedback;
    private Long rating;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Long getRating() {
        return rating;
    }

    public void setRating(Long rating) {
        this.rating = rating;
    }

    public AdminFeedbackInfo(int id, String name, String email, String feedback, Long rating) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.feedback = feedback;
        this.rating = rating;
    }
}
