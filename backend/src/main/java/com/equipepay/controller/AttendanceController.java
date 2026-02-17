package com.equipepay.controller;

import com.equipepay.dto.AttendanceRequest;
import com.equipepay.dto.AttendanceResponse;
import com.equipepay.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:4200,http://localhost:4201")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<AttendanceResponse> markAttendance(@Valid @RequestBody AttendanceRequest request) {
        AttendanceResponse response = attendanceService.markAttendance(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AttendanceResponse> getAttendanceById(@PathVariable Long id) {
        AttendanceResponse response = attendanceService.getAttendanceById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<AttendanceResponse> response = attendanceService.getAttendanceByDate(date);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByWorkerAndDateRange(
            @PathVariable Long workerId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AttendanceResponse> response = attendanceService.getAttendanceByWorkerAndDateRange(workerId, startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/range")
    public ResponseEntity<List<AttendanceResponse>> getAttendanceByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<AttendanceResponse> response = attendanceService.getAttendanceByDateRange(startDate, endDate);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/worker/{workerId}/present-days")
    public ResponseEntity<Long> getPresentDaysCount(
            @PathVariable Long workerId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Long count = attendanceService.getPresentDaysCount(workerId, startDate, endDate);
        return ResponseEntity.ok(count);
    }
}
