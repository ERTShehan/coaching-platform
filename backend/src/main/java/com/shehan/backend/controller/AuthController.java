package com.shehan.backend.controller;

import com.shehan.backend.dto.ApiResponse;
import com.shehan.backend.dto.AuthRequest;
import com.shehan.backend.dto.RegisterRequest;
import com.shehan.backend.dto.SocialLoginRequest;
import com.shehan.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "OK", authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "OK", authService.login(request)));
    }

    @PostMapping("/guest")
    public ResponseEntity<ApiResponse> guestLogin() {
        return ResponseEntity.ok(new ApiResponse(200, "OK", authService.guestLogin()));
    }

    @PostMapping("/social")
    public ResponseEntity<ApiResponse> socialLogin(@RequestBody SocialLoginRequest request) {
        return ResponseEntity.ok(new ApiResponse(200, "OK", authService.socialLogin(request)));
    }
}
