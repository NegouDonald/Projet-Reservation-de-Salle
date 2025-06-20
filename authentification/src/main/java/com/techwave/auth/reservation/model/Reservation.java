package com.techwave.auth.reservation.model;

import com.techwave.auth.Gestion_salle.model.Salle;
import com.techwave.auth.gestion_materiel.model.Materiel;
import com.techwave.auth.reservation.enums.StatutReservation;
import com.techwave.auth.user.model.User;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.time.LocalDateTime;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    @JsonBackReference(value = "user-reservation")
    private User utilisateur;

    @ManyToOne
    @JoinColumn(name = "salle_id")
    @JsonBackReference(value = "salle-reservation")
    private Salle salle;

    @ManyToOne
    @JoinColumn(name = "materiel_id")
    @JsonBackReference(value = "materiel-reservation")
    private Materiel materiel;

    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private StatutReservation statut;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUtilisateur() { return utilisateur; }
    public void setUtilisateur(User utilisateur) { this.utilisateur = utilisateur; }
    public Salle getSalle() { return salle; }
    public void setSalle(Salle salle) { this.salle = salle; }
    public Materiel getMateriel() { return materiel; }
    public void setMateriel(Materiel materiel) { this.materiel = materiel; }
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    public StatutReservation getStatut() { return statut; }
    public void setStatut(StatutReservation statut) { this.statut = statut; }
}