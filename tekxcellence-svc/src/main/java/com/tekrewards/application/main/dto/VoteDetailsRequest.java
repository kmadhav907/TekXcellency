package com.tekrewards.application.main.dto;

public class VoteDetailsRequest {
    @Override
    public String toString() {
        return "VoteDetailsRequest{" +
                "votedById=" + votedById +
                ", voteToId=" + voteToId +
                ", feedback='" + feedback + '\'' +
                ", points=" + points +
                '}';
    }

    private Long votedById;
    private Long voteToId;
    private String feedback;
    private Double points;

    public VoteDetailsRequest(){

    }

    public Long getVotedById() {
        return votedById;
    }

    public void setVotedById(Long votedById) {
        this.votedById = votedById;
    }

    public Long getVoteToId() {
        return voteToId;
    }

    public void setVoteToId(Long voteToId) {
        this.voteToId = voteToId;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public Double getPoints() {
        return points;
    }

    public void setPoints(Double points) {
        this.points = points;
    }
}
