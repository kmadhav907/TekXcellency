package com.tekrewards.application.main.models;

import javax.persistence.*;

@Entity
@Table(name="feedback")
public class Feedback {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="email")
    private  String email;

    @Column(name = "name")
    private String name;

    @Column(name="feedback")
    private String feedback;

    @Column(name="rating")
    private Double rating;

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Feedback() {
    }

    public Feedback(String email, String name, String feedback, Double rating) {
        this.rating = rating;
        this.email = email;
        this.name = name;
        this.feedback = feedback;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
