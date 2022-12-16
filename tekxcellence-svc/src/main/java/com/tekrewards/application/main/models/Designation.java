package com.tekrewards.application.main.models;

import javax.persistence.*;

@Entity
@Table(name="designation")
public class Designation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long designationId;

    @Column(name="designation_name")
    private String designationName;

    public Designation(){

    }

    public Long getDesignationId() {
        return designationId;
    }

    public void setDesignationId(Long designationId) {
        this.designationId = designationId;
    }

    public String getDesignationName() {
        return designationName;
    }

    public void setDesignationName(String designationName) {
        this.designationName = designationName;
    }
}
