package com.techwave.auth.service;

import com.techwave.auth.dto.AuthResponse;
import com.techwave.auth.dto.LoginRequest;
import com.techwave.auth.dto.RegisterRequest;
import com.techwave.auth.entity.User;
import com.techwave.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service // Marque cette classe comme un service Spring
@RequiredArgsConstructor // Génère un constructeur avec les dépendances nécessaires (final)
public class AuthService {

    private final UserRepository userRepository; // Pour accéder à la base de données
    private final PasswordEncoder passwordEncoder; // Pour chiffrer les mots de passe
    private final JwtService jwtService; // Pour générer des tokens JWT

    // 🔐 Méthode d'inscription
    public AuthResponse register(RegisterRequest request) {
        // On crée un nouvel utilisateur avec l’email et le mot de passe chiffré
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // hash du mot de passe
                .role("USER") // rôle par défaut
                .build();

        userRepository.save(user); // on enregistre l'utilisateur dans la base

        // On génère un token JWT pour cet utilisateur
        String email = user.getEmail();
        String token = jwtService.generateToken(email);


        // On retourne ce token au frontend
        return new AuthResponse(token);
    }

    // 🔓 Méthode de connexion
    public AuthResponse login(LoginRequest request) {
        // On cherche l’utilisateur en base par son email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // On vérifie si le mot de passe entré est correct
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Mot de passe invalide");
        }

        // Si tout est bon, on génère un token JWT
        String email = user.getEmail();
        String token = jwtService.generateToken(email);

        return new AuthResponse(token);
    }
}
