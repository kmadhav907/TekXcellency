package com.tekrewards.application.main.models;

import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;

@Entity
@Table(name="Skills")
public class Skills {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="skill_id")
    private Long id;

    @Column(name="skill_name")
    private String skillName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
}
