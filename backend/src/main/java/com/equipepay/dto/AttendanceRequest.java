package com.equipepay.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class AttendanceRequest {
    @NotNull
    private LocalDate date;

    @NotNull
    private Long workerId;

    @NotNull
    private String status;

    public AttendanceRequest() {}

    public AttendanceRequest(LocalDate date, Long workerId, String status) {
        this.date = date;
        this.workerId = workerId;
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getWorkerId() {
        return workerId;
    }

    public void setWorkerId(Long workerId) {
        this.workerId = workerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
