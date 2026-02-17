package com.equipepay.controller;

import com.equipepay.dto.WorkerRequest;
import com.equipepay.dto.WorkerResponse;
import com.equipepay.service.WorkerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workers")
@CrossOrigin(origins = "http://localhost:4200,http://localhost:4201")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @PostMapping
    public ResponseEntity<WorkerResponse> createWorker(@Valid @RequestBody WorkerRequest request) {
        WorkerResponse response = workerService.createWorker(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkerResponse> updateWorker(@PathVariable Long id, @Valid @RequestBody WorkerRequest request) {
        WorkerResponse response = workerService.updateWorker(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
        workerService.deleteWorker(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkerResponse> getWorkerById(@PathVariable Long id) {
        WorkerResponse response = workerService.getWorkerById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<WorkerResponse>> getAllWorkers() {
        List<WorkerResponse> response = workerService.getAllWorkers();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<WorkerResponse>> searchWorkers(@RequestParam String name) {
        List<WorkerResponse> response = workerService.searchWorkersByName(name);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-position")
    public ResponseEntity<List<WorkerResponse>> getWorkersByPosition(@RequestParam String position) {
        List<WorkerResponse> response = workerService.getWorkersByPosition(position);
        return ResponseEntity.ok(response);
    }
}
