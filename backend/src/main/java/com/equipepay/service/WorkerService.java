package com.equipepay.service;

import com.equipepay.dto.WorkerRequest;
import com.equipepay.dto.WorkerResponse;
import com.equipepay.entity.Worker;
import com.equipepay.repository.WorkerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkerService {

    private final WorkerRepository workerRepository;

    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    @Transactional
    public WorkerResponse createWorker(WorkerRequest request) {
        if (workerRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        Worker worker = new Worker();
        worker.setName(request.getName());
        worker.setPhone(request.getPhone());
        worker.setPosition(request.getPosition());
        worker.setMonthlySalary(request.getMonthlySalary());
        worker.setJoinDate(request.getJoinDate());
        worker.setPhotoUrl(request.getPhotoUrl());

        Worker savedWorker = workerRepository.save(worker);
        return convertToResponse(savedWorker);
    }

    @Transactional
    public WorkerResponse updateWorker(Long id, WorkerRequest request) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));

        if (!worker.getPhone().equals(request.getPhone()) && workerRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        worker.setName(request.getName());
        worker.setPhone(request.getPhone());
        worker.setPosition(request.getPosition());
        worker.setMonthlySalary(request.getMonthlySalary());
        worker.setJoinDate(request.getJoinDate());
        worker.setPhotoUrl(request.getPhotoUrl());

        Worker updatedWorker = workerRepository.save(worker);
        return convertToResponse(updatedWorker);
    }

    @Transactional
    public void deleteWorker(Long id) {
        if (!workerRepository.existsById(id)) {
            throw new RuntimeException("Worker not found");
        }
        workerRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public WorkerResponse getWorkerById(Long id) {
        Worker worker = workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
        return convertToResponse(worker);
    }

    @Transactional(readOnly = true)
    public List<WorkerResponse> getAllWorkers() {
        return workerRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<WorkerResponse> searchWorkersByName(String name) {
        return workerRepository.findByNameContaining(name).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<WorkerResponse> getWorkersByPosition(String position) {
        return workerRepository.findByPosition(position).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private WorkerResponse convertToResponse(Worker worker) {
        return new WorkerResponse(
                worker.getId(),
                worker.getName(),
                worker.getPhone(),
                worker.getPosition(),
                worker.getMonthlySalary(),
                worker.getDailySalary(),
                worker.getJoinDate(),
                worker.getPhotoUrl(),
                worker.getCreatedAt(),
                worker.getUpdatedAt()
        );
    }
}
