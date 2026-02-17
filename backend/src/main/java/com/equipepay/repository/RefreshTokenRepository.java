package com.equipepay.repository;

import com.equipepay.entity.RefreshToken;
import com.equipepay.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    
    Optional<RefreshToken> findByUserAndExpiryDateAfter(User user, LocalDateTime now);
    
    void deleteByUser(User user);
    
    void deleteByToken(String token);
}
