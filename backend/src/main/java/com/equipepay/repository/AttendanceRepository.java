package com.equipepay.repository;

import com.equipepay.entity.Attendance;
import com.equipepay.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByWorkerAndDate(Worker worker, LocalDate date);
    
    @Query("SELECT a FROM Attendance a WHERE a.worker.id = :workerId AND a.date BETWEEN :startDate AND :endDate")
    List<Attendance> findByWorkerIdAndDateBetween(@Param("workerId") Long workerId, 
                                                   @Param("startDate") LocalDate startDate, 
                                                   @Param("endDate") LocalDate endDate);
    
    @Query("SELECT a FROM Attendance a WHERE a.date = :date")
    List<Attendance> findByDate(@Param("date") LocalDate date);
    
    @Query("SELECT a FROM Attendance a JOIN FETCH a.worker WHERE a.date = :date")
    List<Attendance> findByDateWithWorker(@Param("date") LocalDate date);
    
    @Query("SELECT a FROM Attendance a WHERE a.date BETWEEN :startDate AND :endDate")
    List<Attendance> findByDateBetween(@Param("startDate") LocalDate startDate, 
                                       @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.worker = :worker AND a.status = 'PRESENT' AND a.date BETWEEN :startDate AND :endDate")
    Long countPresentDaysByWorkerAndDateRange(@Param("worker") Worker worker, 
                                            @Param("startDate") LocalDate startDate, 
                                            @Param("endDate") LocalDate endDate);
}
