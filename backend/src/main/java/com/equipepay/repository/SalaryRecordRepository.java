package com.equipepay.repository;

import com.equipepay.entity.SalaryRecord;
import com.equipepay.entity.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SalaryRecordRepository extends JpaRepository<SalaryRecord, Long> {
    List<SalaryRecord> findByWorker(Worker worker);
    
    @Query("SELECT s FROM SalaryRecord s WHERE s.worker.id = :workerId AND s.paymentDate BETWEEN :startDate AND :endDate")
    List<SalaryRecord> findByWorkerIdAndPaymentDateBetween(@Param("workerId") Long workerId, 
                                                           @Param("startDate") LocalDate startDate, 
                                                           @Param("endDate") LocalDate endDate);
    
    @Query("SELECT s FROM SalaryRecord s WHERE s.paymentDate BETWEEN :startDate AND :endDate")
    List<SalaryRecord> findByPaymentDateBetween(@Param("startDate") LocalDate startDate, 
                                               @Param("endDate") LocalDate endDate);
    
    @Query("SELECT s FROM SalaryRecord s WHERE s.worker = :worker AND MONTH(s.paymentDate) = :month AND YEAR(s.paymentDate) = :year")
    List<SalaryRecord> findByWorkerAndMonthAndYear(@Param("worker") Worker worker, 
                                                  @Param("month") int month, 
                                                  @Param("year") int year);
}
