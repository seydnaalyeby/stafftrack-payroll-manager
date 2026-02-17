package com.equipepay.service;

import com.equipepay.dto.AttendanceRequest;
import com.equipepay.dto.AttendanceResponse;
import com.equipepay.entity.Attendance;
import com.equipepay.entity.Attendance.AttendanceStatus;
import com.equipepay.entity.Worker;
import com.equipepay.repository.AttendanceRepository;
import com.equipepay.repository.WorkerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final WorkerRepository workerRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, WorkerRepository workerRepository) {
        this.attendanceRepository = attendanceRepository;
        this.workerRepository = workerRepository;
    }

    @Transactional
    public AttendanceResponse markAttendance(AttendanceRequest request) {
        Worker worker = workerRepository.findById(request.getWorkerId())
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        AttendanceStatus status;
        try {
            status = AttendanceStatus.valueOf(request.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid attendance status. Must be PRESENT or ABSENT");
        }

        Attendance attendance = attendanceRepository.findByWorkerAndDate(worker, request.getDate())
                .orElse(null);

        if (attendance == null) {
            attendance = new Attendance(request.getDate(), worker, status);
        } else {
            attendance.setStatus(status);
        }

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return convertToResponse(savedAttendance);
    }

    public AttendanceResponse getAttendanceById(Long id) {
        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));
        return convertToResponse(attendance);
    }

    public List<AttendanceResponse> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDateWithWorker(date).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getAttendanceByWorkerAndDateRange(Long workerId, LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByWorkerIdAndDateBetween(workerId, startDate, endDate).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<AttendanceResponse> getAttendanceByDateRange(LocalDate startDate, LocalDate endDate) {
        return attendanceRepository.findByDateBetween(startDate, endDate).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Long getPresentDaysCount(Long workerId, LocalDate startDate, LocalDate endDate) {
        Worker worker = workerRepository.findById(workerId)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
        return attendanceRepository.countPresentDaysByWorkerAndDateRange(worker, startDate, endDate);
    }

    private AttendanceResponse convertToResponse(Attendance attendance) {
        return new AttendanceResponse(
                attendance.getId(),
                attendance.getDate(),
                attendance.getWorker().getId(),
                attendance.getWorker().getName(),
                attendance.getStatus().name(),
                attendance.getCreatedAt(),
                attendance.getUpdatedAt()
        );
    }
}
