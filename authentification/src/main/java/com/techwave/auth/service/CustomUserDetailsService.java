package com.techwave.auth.service;



import com.techwave.auth.entity.User;
import com.techwave.auth.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // 📌 Cette méthode est appelée automatiquement par Spring pour authentifier un utilisateur
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 🔍 Recherche l'utilisateur par email dans la base de données
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        // ✅ Retourne l'utilisateur sous forme d'objet UserDetails (utilisé par Spring Security)
        return user;
    }
}
