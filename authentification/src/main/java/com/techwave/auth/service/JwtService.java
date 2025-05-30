package com.techwave.auth.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    // Clé secrète pour signer le token (à garder confidentielle)
    private final String SECRET_KEY = "mon-super-secret-que-tu-dois-changer-et-garder-prive-123456";

    // 🔐 Retourne la clé de signature
    private Key getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 📤 Génère un token JWT à partir du username
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // le contenu principal : le username
                .setIssuedAt(new Date(System.currentTimeMillis())) // date de création
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // expire dans 10h
                .signWith(getSignInKey(), SignatureAlgorithm.HS256) // signe avec clé secrète
                .compact(); // retourne le token
    }

    // 📥 Extraire le username depuis un token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // 🛠 Méthode générique pour extraire des infos
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // 🔍 Extraire toutes les infos
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Vérifie que le token est encore valide
    public boolean isTokenValid(String token, String username) {
        final String extractedUsername = extractUsername(token);
        return extractedUsername.equals(username) && !isTokenExpired(token);
    }

    // ⏳ Vérifie expiration
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}

