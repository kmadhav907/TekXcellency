package com.tekrewards.application.main.models;

import javax.persistence.*;

@Entity
@Table(name= "practise")
public class Practice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long practiseId;

    @Column(name="practise_name", nullable = false)
    private String practiseName;

    public Practice() {
    }

    public Long getPractiseId() {
        return practiseId;
    }

    public void setPractiseId(Long practiseId) {
        this.practiseId = practiseId;
    }

    public String getPractiseName() {
        return practiseName;
    }

    public void setPractiseName(String practiseName) {
        this.practiseName = practiseName;
    }
}
