package com.techwave.auth.controller;


import com.techwave.auth.dto.AuthResponse;
import com.techwave.auth.dto.LoginRequest;
import com.techwave.auth.dto.RegisterRequest;
import com.techwave.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // Cette classe est un contrôleur REST
@RequestMapping("/api/auth") // Préfixe commun à toutes les routes : /api/auth/...
@RequiredArgsConstructor // Génère un constructeur avec les dépendances "final"
public class AuthController {

    private final AuthService authService; // Injection du service d'authentification

    // 🎯 Endpoint pour l'inscription (POST /api/auth/register)
    @PostMapping("/register")
//    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // On appelle la méthode d’inscription du service
        AuthResponse response = authService.register(request);
        //return ResponseEntity.ok(new AuthResponse("token_jwt_exemple"));// Retourne le token généré
        return ResponseEntity.ok(response); // Retourne le token généré
    }

    // 🎯 Endpoint pour la connexion (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        // On appelle la méthode de login du service
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response); // Retourne le token généré
    }
}
