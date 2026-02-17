package com.equipepay.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public class WorkerRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotBlank
    private String position;

    @NotNull
    @Positive
    private BigDecimal monthlySalary;

    @NotNull
    private LocalDate joinDate;

    private String photoUrl;

    public WorkerRequest() {}

    public WorkerRequest(String name, String phone, String position, BigDecimal monthlySalary, LocalDate joinDate, String photoUrl) {
        this.name = name;
        this.phone = phone;
        this.position = position;
        this.monthlySalary = monthlySalary;
        this.joinDate = joinDate;
        this.photoUrl = photoUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public BigDecimal getMonthlySalary() {
        return monthlySalary;
    }

    public void setMonthlySalary(BigDecimal monthlySalary) {
        this.monthlySalary = monthlySalary;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
