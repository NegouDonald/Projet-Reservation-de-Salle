package com.techwave.auth.reservation.service;

import com.techwave.auth.reservation.dto.ReservationRequestDTO;
import com.techwave.auth.reservation.dto.ReservationResponseDTO;
import com.techwave.auth.user.model.User;

import java.util.List;

public interface ReservationService {
    ReservationResponseDTO reserver(ReservationRequestDTO request);
    List<ReservationResponseDTO> consulterPlanning();
    List<ReservationResponseDTO> consulterMesReservations(Long utilisateurId);
    List<ReservationResponseDTO> consulterPlanningFormation(User user);
    void validerReservation(Long id);
    void refuserReservation(Long id);
}