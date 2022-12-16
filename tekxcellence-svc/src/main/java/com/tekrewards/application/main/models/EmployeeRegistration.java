package com.tekrewards.application.main.models;

import javax.persistence.*;

@Entity
@Table(name="register")
public class EmployeeRegistration {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    @Column(name="id")
    private long id;
    @Column(name="firstname")
    private String firstname;
    @Column(name="gender")
    private String gender;
    @Column(name="phonenumber")
    private long phonenumber;
    @Column(name="email")
    private String email;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;

    public EmployeeRegistration() {

    }

    public EmployeeRegistration(String firstname, String gender, long phonenumber, String email, String username,
                                String password) {
        super();
        this.firstname = firstname;
        this.gender = gender;
        this.phonenumber = phonenumber;
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public long getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(long phonenumber) {
        this.phonenumber = phonenumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
