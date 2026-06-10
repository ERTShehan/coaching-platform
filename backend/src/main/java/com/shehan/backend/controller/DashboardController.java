package com.shehan.backend.controller;

import com.shehan.backend.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @GetMapping
    public ResponseEntity<ApiResponse> getDashboardData(@AuthenticationPrincipal UserDetails userDetails) {
        String message = "Welcome to the Private Coaching Dashboard, " + userDetails.getUsername() + "!";
        return ResponseEntity.ok(new ApiResponse(200, "OK", message));
    }
}
