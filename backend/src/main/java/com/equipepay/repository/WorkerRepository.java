package com.equipepay.repository;

import com.equipepay.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByPhone(String phone);
    boolean existsByPhone(String phone);
    
    @Query("SELECT w FROM Worker w WHERE w.name LIKE CONCAT('%', :name, '%')")
    List<Worker> findByNameContaining(String name);
    
    @Query("SELECT w FROM Worker w WHERE w.position = :position")
    List<Worker> findByPosition(String position);
}
