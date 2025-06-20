package com.techwave.auth;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordEncoderTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password";
        String encodedPassword = "$2a$10$8.UnVuG9HHG5g/.pmS48Lu4u2Y38zVROFLGhmW0gTB2DhALP3l/WO";
        System.out.println("Mot de passe correspond : " + encoder.matches(rawPassword, encodedPassword));
    }
}