package com.techwave.auth.dto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token; // Le token JWT envoyé après inscription ou connexion
}
