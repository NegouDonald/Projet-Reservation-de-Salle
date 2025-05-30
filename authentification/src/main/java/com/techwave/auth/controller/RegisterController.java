//package com.techwave.auth.controller;
//
//
//
//import com.techwave.auth.entity.User;
//import com.techwave.auth.repository.UserRepository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")  // Préfixe commun à toutes les routes ici
//public class RegisterController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    // Route POST pour enregistrer un nouvel utilisateur
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        // 🔍 Vérifie si l’email est déjà utilisé
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            // 🚫 Email déjà pris → réponse 400 (bad request)
//            return ResponseEntity.badRequest().body("Email déjà utilisé");
//        }
//
//        // 🔐 Encode le mot de passe avant de sauvegarder
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        // 📦 Sauvegarde l’utilisateur dans la base
//        userRepository.save(user);
//
//        // ✅ Retourne un message de succès
//        return ResponseEntity.ok("Utilisateur enregistré avec succès");
//    }
//}
