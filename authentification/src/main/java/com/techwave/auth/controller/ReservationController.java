package com.techwave.auth.controller;

import com.techwave.auth.reservation.dto.ReservationRequestDTO;
import com.techwave.auth.reservation.dto.ReservationResponseDTO;
import com.techwave.auth.user.model.User;
import com.techwave.auth.reservation.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationResponseDTO> createReservation(
            @Valid @RequestBody ReservationRequestDTO request,
            @AuthenticationPrincipal User user) {
        request.setUtilisateurId(user.getId());
        return ResponseEntity.ok(reservationService.reserver(request));
    }

    @GetMapping("/planning")
    public ResponseEntity<List<ReservationResponseDTO>> getPlanning() {
        return ResponseEntity.ok(reservationService.consulterPlanning());
    }

    @GetMapping("/mes-reservations")
    public ResponseEntity<List<ReservationResponseDTO>> getMyReservations(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(reservationService.consulterMesReservations(user.getId()));
    }

    @GetMapping("/planning-formation")
    public ResponseEntity<List<ReservationResponseDTO>> getPlanningFormation(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(reservationService.consulterPlanningFormation(user));
    }

    @PutMapping("/{id}/valider")
    public ResponseEntity<Void> validateReservation(@PathVariable Long id) {
        reservationService.validerReservation(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/refuser")
    public ResponseEntity<Void> refuseReservation(@PathVariable Long id) {
        reservationService.refuserReservation(id);
        return ResponseEntity.ok().build();
    }
}