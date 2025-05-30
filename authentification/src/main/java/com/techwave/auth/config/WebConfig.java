package com.techwave.auth.config;

// WebConfig.java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            // Cette méthode configure les règles CORS
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // autorise tous les chemins
                        .allowedOrigins("http://localhost:5173") // autorise ton frontend Vite
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // méthodes HTTP autorisées
                        .allowedHeaders("*") // autorise tous les headers
                        .allowCredentials(true); // permet l’envoi de cookies ou d’en-têtes d’auth
            }
        };
    }
}
