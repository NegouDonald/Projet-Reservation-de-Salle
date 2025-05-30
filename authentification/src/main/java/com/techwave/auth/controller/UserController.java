package com.techwave.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<Map<String, String>> getCurrentUserEmail(Authentication authentication) {
        // Récupère le nom de l’utilisateur (généralement son email)
        String email = authentication.getName();

        // Tu peux aussi récupérer plus de détails si tu stockes un objet UserDetails personnalisé

        return ResponseEntity.ok(Map.of("email", email));
    }
}
