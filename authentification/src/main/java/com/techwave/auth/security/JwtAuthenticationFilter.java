package com.techwave.auth.security;



import com.techwave.auth.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.techwave.auth.service.CustomUserDetailsService;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // 🧠 Récupère l’en-tête Authorization : "Bearer <token>"
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 🚫 Si pas d’en-tête ou mauvais format → on laisse passer la requête
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 🔑 Extrait le token
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);

        // 🧪 Si utilisateur non encore authentifié
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // 🔍 Charge les infos utilisateur
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // ✅ Vérifie que le token est bien valide
            if (jwtService.isTokenValid(jwt, userDetails.getUsername())) {
                // 🔐 Crée un objet d’authentification
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));

                // 🧠 Enregistre l’utilisateur authentifié dans le contexte de sécurité
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // ➡️ Poursuit la chaîne de filtres
        filterChain.doFilter(request, response);
    }
}
