package com.techwave.auth.reservation.dto;
//Les DTOs sont utilisés pour transférer des données entre les couches.
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class ReservationRequestDTO {

    private Long utilisateurId; // Suppression de @NotNull

    @NotNull(message = "La date de début est requise")
    private LocalDateTime dateDebut;

    @NotNull(message = "La date de fin est requise")
    private LocalDateTime dateFin;

    private Long salleId;

    private Long materielId;

    // Getters et Setters
    public Long getUtilisateurId() { return utilisateurId; }
    public void setUtilisateurId(Long utilisateurId) { this.utilisateurId = utilisateurId; }
    public LocalDateTime getDateDebut() { return dateDebut; }
    public void setDateDebut(LocalDateTime dateDebut) { this.dateDebut = dateDebut; }
    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }
    public Long getSalleId() { return salleId; }
    public void setSalleId(Long salleId) { this.salleId = salleId; }
    public Long getMaterielId() { return materielId; }
    public void setMaterielId(Long materielId) { this.materielId = materielId; }
}