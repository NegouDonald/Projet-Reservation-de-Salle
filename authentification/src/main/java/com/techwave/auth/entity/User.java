package com.techwave.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity // Cette classe sera mappée à une table en base
@Data // Lombok génère getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {  // Implémentation de UserDetails

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // Exemple : "USER", "ADMIN"

    // --------- Méthodes obligatoires de l’interface UserDetails ------------

    // Cette méthode retourne la liste des rôles/authorities sous forme d’objets Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Ici, on crée une liste contenant un seul rôle à partir du champ `role`
        return List.of(new SimpleGrantedAuthority(role));
    }

    // La méthode getPassword() doit retourner le mot de passe encodé
    @Override
    public String getPassword() {
        return password;
    }

    // Cette méthode retourne le nom d’utilisateur (ici on utilise email)
    @Override
    public String getUsername() {
        return email;
    }

    // Pour simplifier, on indique que le compte n’est pas expiré
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // Le compte n’est pas verrouillé
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // Les credentials (mot de passe) ne sont pas expirés
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Le compte est activé/enabled
    @Override
    public boolean isEnabled() {
        return true;
    }
}
