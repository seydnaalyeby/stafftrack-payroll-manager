package com.equipepay.service;

import com.equipepay.entity.RefreshToken;
import com.equipepay.entity.User;
import com.equipepay.repository.RefreshTokenRepository;
import com.equipepay.security.JwtService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, JwtService jwtService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
    }

    public RefreshToken createRefreshToken(User user) {
        // Delete existing refresh tokens for this user
        refreshTokenRepository.deleteByUser(user);
        
        // Create new refresh token
        String refreshToken = jwtService.generateRefreshToken(user);
        LocalDateTime expiryDate = LocalDateTime.now().plusSeconds(jwtService.getRefreshExpirationTime() / 1000);
        
        RefreshToken newRefreshToken = new RefreshToken(refreshToken, user, expiryDate);
        return refreshTokenRepository.save(newRefreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException("Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    public void deleteByUser(User user) {
        refreshTokenRepository.deleteByUser(user);
    }
}
