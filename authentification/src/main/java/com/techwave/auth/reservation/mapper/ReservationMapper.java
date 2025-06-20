package com.techwave.auth.reservation.mapper;
//Le mapper convertit les entités en DTOs et vice versa.

import com.techwave.auth.reservation.dto.ReservationResponseDTO;
import com.techwave.auth.reservation.model.Reservation;

public class ReservationMapper {

    public static ReservationResponseDTO toResponseDTO(Reservation reservation) {
        ReservationResponseDTO dto = new ReservationResponseDTO();
        dto.setId(reservation.getId());
        dto.setUtilisateurUsername(reservation.getUtilisateur() != null ? reservation.getUtilisateur().getUsername() : null);
        dto.setSalleId(reservation.getSalle() != null ? reservation.getSalle().getId() : null);
        dto.setSalleNom(reservation.getSalle() != null ? reservation.getSalle().getNom() : null);
        dto.setMaterielId(reservation.getMateriel() != null ? reservation.getMateriel().getId() : null);
        dto.setMaterielType(reservation.getMateriel() != null ? reservation.getMateriel().getType() : null);
        dto.setDateDebut(reservation.getDateDebut());
        dto.setDateFin(reservation.getDateFin());
        dto.setStatut(reservation.getStatut());
        return dto;
    }
}