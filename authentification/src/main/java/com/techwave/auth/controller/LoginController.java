//package com.techwave.auth.controller;
//
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class LoginController {
//
//    @PostMapping("/api/login")
//    public String login(@RequestBody LoginRequest request) {
//        // Implémenter la logique de génération de JWT
//        return "JWT_TOKEN";
//    }
//
//    static class LoginRequest {
//        private String username;
//        private String password;
//
//        public String getUsername() { return username; }
//        public void setUsername(String username) { this.username = username; }
//        public String getPassword() { return password; }
//        public void setPassword(String password) { this.password = password; }
//    }
//}