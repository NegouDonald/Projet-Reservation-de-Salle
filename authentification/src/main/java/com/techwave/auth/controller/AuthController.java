package com.techwave.auth.controller;

import com.techwave.auth.user.dao.LoginRequest;
import com.techwave.auth.user.dao.LoginResponse;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.techwave.auth.user.dao.RegisterRequest;
import com.techwave.auth.user.model.User;
import com.techwave.auth.user.model.UserRole;
import com.techwave.auth.user.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger LOGGER = Logger.getLogger(AuthController.class.getName());
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecretKey secretKey;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.secretKey = Keys.hmacShaKeyFor("your-very-secure-secret-key-1234567890".getBytes());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        LOGGER.info("Tentative de connexion pour l'utilisateur : " + loginRequest.getUsername());
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            LOGGER.info("Authentification réussie pour : " + userDetails.getUsername());

            String jwt = Jwts.builder()
                    .setSubject(userDetails.getUsername())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 heures
                    .signWith(secretKey)
                    .compact();

            return ResponseEntity.ok(new LoginResponse(jwt));
        } catch (BadCredentialsException e) {
            LOGGER.severe("Identifiants incorrects pour : " + loginRequest.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
        } catch (Exception e) {
            LOGGER.severe("Erreur d'authentification : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur d'authentification : " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        LOGGER.info("Tentative d'inscription pour l'utilisateur : " + registerRequest.getUsername());
        try {
            if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
                LOGGER.warning("Utilisateur déjà existant : " + registerRequest.getUsername());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Utilisateur déjà existant");
            }

            User user = new User();
            user.setUsername(registerRequest.getUsername());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            String role = registerRequest.getRole() != null ? registerRequest.getRole() : "ENSEIGNANT";
            user.setRole(UserRole.valueOf(role));
            userRepository.save(user);

            LOGGER.info("Inscription réussie pour : " + registerRequest.getUsername());
            return ResponseEntity.ok("Inscription réussie");
        } catch (IllegalArgumentException e) {
            LOGGER.severe("Rôle invalide : " + registerRequest.getRole());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Rôle invalide");
        } catch (Exception e) {
            LOGGER.severe("Erreur d'inscription : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur d'inscription : " + e.getMessage());
        }
    }
}