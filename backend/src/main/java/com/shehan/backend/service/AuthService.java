package com.shehan.backend.service;

import com.shehan.backend.dto.AuthRequest;
import com.shehan.backend.dto.AuthResponse;
import com.shehan.backend.dto.RegisterRequest;
import com.shehan.backend.dto.SocialLoginRequest;
import com.shehan.backend.entity.Role;
import com.shehan.backend.entity.User;
import com.shehan.backend.repository.UserRepository;
import com.shehan.backend.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public String register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }

        User user = User.builder()
                .name(request.getName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return "User Registration Success";
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        return generateTokens(user);
    }

    public AuthResponse guestLogin() {
        String guestEmail = "guest_" + UUID.randomUUID().toString().substring(0,8) + "@guest.com";
        String randomPassword = UUID.randomUUID().toString();

        User guestUser = User.builder()
                .name("Guest User")
                .email(guestEmail)
                .password(passwordEncoder.encode(randomPassword))
                .role(Role.GUEST)
                .build();
        userRepository.save(guestUser);
        return generateTokens(guestUser);
    }

    public AuthResponse socialLogin(SocialLoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .name(request.getName())
                            .email(request.getEmail())
                            .password(passwordEncoder.encode(UUID.randomUUID().toString())) // random password
                            .role(Role.USER)
                            .build();
                    return userRepository.save(newUser);
                });
        return generateTokens(user);
    }

    private AuthResponse generateTokens(User user) {
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        return new AuthResponse(accessToken, refreshToken, user.getRole().name());
    }
}
