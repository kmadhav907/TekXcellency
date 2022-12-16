package com.tekrewards.application.main.models;

import javax.persistence.*;

@Entity
@Table(name="awards")
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="award_id")
    private Long awardID;
    @Column(name="award_name")
    private String awardName;
    @Column(name="brief_description")
    @Lob
    private String awardBriefDescription;
    @Column(name="main_description")
    @Lob
    private String awardMainDescription;

    public Award() {
    }
    public Award(String awardName, String awardBriefDescription, String awardMainDescription) {
        this.awardName = awardName;
        this.awardBriefDescription = awardBriefDescription;
        this.awardMainDescription = awardMainDescription;
    }

    @Override
    public String toString() {
        return "Award{" +
                "awardID=" + awardID +
                ", awardName='" + awardName + '\'' +
                ", awardBriefDescription='" + awardBriefDescription + '\'' +
                ", awardMainDescription='" + awardMainDescription + '\'' +
                '}';
    }

    public Long getAwardID() {
        return awardID;
    }

    public void setAwardID(Long awardID) {
        this.awardID = awardID;
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
