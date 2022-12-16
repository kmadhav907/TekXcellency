package com.tekrewards.application.main.pojo;

public class AwardDetailsObject {
    private Long awardId;
    private String awardName;
    private String awardBriefDescription;
    private String awardMainDescription;

    public AwardDetailsObject(Long awardId, String awardName, String awardBriefDescription, String awardMainDescription) {
        this.awardId = awardId;
        this.awardName = awardName;
        this.awardBriefDescription = awardBriefDescription;
        this.awardMainDescription = awardMainDescription;
    }

    public AwardDetailsObject() {
    }

    @Override
    public String toString() {
        return "AwardDetailsObject{" +
                "awardName='" + awardName + '\'' +
                ", awardBriefDescription='" + awardBriefDescription + '\'' +
                ", awardMainDescription='" + awardMainDescription + '\'' +
                '}';
    }

    public Long getAwardId() {
        return awardId;
    }

    public void setAwardId(Long awardId) {
        this.awardId = awardId;
    }

    public String getAwardName() {
        return awardName;
    }

    public void setAwardName(String awardName) {
        this.awardName = awardName;
    }

    public String getAwardBriefDescription() {
        return awardBriefDescription;
    }

    public void setAwardBriefDescription(String awardBriefDescription) {
        this.awardBriefDescription = awardBriefDescription;
    }

    public String getAwardMainDescription() {
        return awardMainDescription;
    }

    public void setAwardMainDescription(String awardMainDescription) {
        this.awardMainDescription = awardMainDescription;
    }
}
