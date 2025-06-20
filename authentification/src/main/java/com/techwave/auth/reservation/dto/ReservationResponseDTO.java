package com.techwave.auth.reservation.dto;

import com.techwave.auth.reservation.enums.StatutReservation;
import java.time.LocalDateTime;

public class ReservationResponseDTO {

    private Long id;
    private String utilisateurUsername;
    private Long salleId;
    private String salleNom;
    private Long materielId;
    private String materielType;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private StatutReservation statut;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUtilisateurUsername() { return utilisateurUsername; }
    public void setUtilisateurUsername(String utilisateurUsername) { this.utilisateurUsername = utilisateurUsername; }
    public Long getSalleId() { return salleId; }
    public void setSalleId(Long salleId) { this.salleId = salleId; }
    public String getSalleNom() { return salleNom; }
    public void setSalleNom(String salleNom) { this.salleNom = salleNom; }
    public Long getMaterielId() { return materielId; }
    public void setMaterielId(Long materielId) { this.materielId = materielId; }
    public String getMaterielType() { return materielType; }
    public void setMaterielType(String materielType) { this.materielType = materielType; }
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    public StatutReservation getStatut() { return statut; }
    public void setStatut(StatutReservation statut) { this.statut = statut; }
}