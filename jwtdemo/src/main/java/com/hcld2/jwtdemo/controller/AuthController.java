
package com.hcld2.jwtdemo.controller;

import com.hcld2.jwtdemo.dto.AuthRequest;
import com.hcld2.jwtdemo.entity.User;
import com.hcld2.jwtdemo.repository.UserRepository;
import com.hcld2.jwtdemo.service.JwtService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Constructor injection
    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody AuthRequest req) {

        if (userRepository.findByUsername(req.username()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "Username is already in use")
            );
        }

        userRepository.save(
                new User(
                        req.username(),
                        passwordEncoder.encode(req.password())
                )
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(
                Map.of("message", "User registered successfully")
        );
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest req) {

        User user = userRepository.findByUsername(req.username())
                .orElse(null);
        //Checking whether user exists or not
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", "Invalid username or password")
            );
        }

        // Verify password
        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    Map.of("error", "Invalid username or password")
            );
        }

        // Generate JWT token
        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(
                Map.of(
                        "message", "Login successful",
                        "token", token,
                        "username", user.getUsername()
                )
        );
    }

}
