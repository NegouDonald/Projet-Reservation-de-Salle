package com.techwave.auth.Gestion_salle.model;

import com.techwave.auth.reservation.model.Reservation;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

@Entity
@Table(name = "salles")
public class Salle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Le nom ne peut pas être vide")
    private String nom;

    private int capacite;

    @NotEmpty(message = "Le bâtiment ne peut pas être vide")
    private String batiment;

    private boolean disponible;

    @OneToMany(mappedBy = "salle")
    @JsonManagedReference
    private Set<Reservation> reservations;

    // Constructeurs
    public Salle() {
        this.disponible = true;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public int getCapacite() { return capacite; }
    public void setCapacite(int capacite) { this.capacite = capacite; }
    public String getBatiment() { return batiment; }
    public void setBatiment(String batiment) { this.batiment = batiment; }
    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
    public Set<Reservation> getReservations() { return reservations; }
    public void setReservations(Set<Reservation> reservations) { this.reservations = reservations; }
}