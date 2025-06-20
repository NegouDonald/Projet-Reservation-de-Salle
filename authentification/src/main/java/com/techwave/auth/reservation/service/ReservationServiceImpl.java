package com.techwave.auth.reservation.service;


import com.techwave.auth.Gestion_salle.Service.SalleService;
import com.techwave.auth.reservation.dto.ReservationRequestDTO;
import com.techwave.auth.reservation.dto.ReservationResponseDTO;
import com.techwave.auth.reservation.enums.StatutReservation;
import com.techwave.auth.reservation.model.Reservation;
import com.techwave.auth.Gestion_salle.model.Salle;
import com.techwave.auth.gestion_materiel.model.Materiel;
import com.techwave.auth.user.model.User;
import com.techwave.auth.user.model.UserRole;
import com.techwave.auth.reservation.repository.ReservationRepository;
import com.techwave.auth.Gestion_salle.Repository.SalleRepository;
import com.techwave.auth.gestion_materiel.repository.MaterielRepository;
import com.techwave.auth.user.repository.UserRepository;
import com.techwave.auth.reservation.mapper.ReservationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final SalleRepository salleRepository;
    private final MaterielRepository materielRepository;
    private final UserRepository userRepository;
    private final SalleService salleService;

    @Autowired
    public ReservationServiceImpl(
            ReservationRepository reservationRepository,
            SalleRepository salleRepository,
            MaterielRepository materielRepository,
            UserRepository userRepository,
            SalleService salleService) {
        this.reservationRepository = reservationRepository;
        this.salleRepository = salleRepository;
        this.materielRepository = materielRepository;
        this.userRepository = userRepository;
        this.salleService = salleService;
    }

    @Override
    public ReservationResponseDTO reserver(ReservationRequestDTO request) {
        User user = userRepository.findById(request.getUtilisateurId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (user.getRole() != UserRole.ENSEIGNANT && user.getRole() != UserRole.ENSEIGNANT_RESPONSABLE) {
            throw new RuntimeException("Seuls les enseignants peuvent réserver.");
        }

        if (request.getDateDebut().isAfter(request.getDateFin())) {
            throw new RuntimeException("La date de début doit être antérieure à la date de fin.");
        }
        if (request.getDateDebut().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("La date de début ne peut pas être dans le passé.");
        }

        if (request.getSalleId() != null) {
            List<Reservation> conflictingSalle = reservationRepository
                    .findBySalleIdAndDateDebutLessThanEqualAndDateFinGreaterThanEqual(
                            request.getSalleId(), request.getDateFin(), request.getDateDebut());
            if (!conflictingSalle.isEmpty()) {
                throw new RuntimeException("Salle non disponible pour cette période.");
            }
        }

        if (request.getMaterielId() != null) {
            List<Reservation> conflictingMateriel = reservationRepository
                    .findByMaterielIdAndDateDebutLessThanEqualAndDateFinGreaterThanEqual(
                            request.getMaterielId(), request.getDateFin(), request.getDateDebut());
            if (!conflictingMateriel.isEmpty()) {
                throw new RuntimeException("Matériel non disponible pour cette période.");
            }
        }

        Reservation reservation = new Reservation();
        reservation.setUtilisateur(user);
        reservation.setDateDebut(request.getDateDebut());
        reservation.setDateFin(request.getDateFin());

        if (request.getSalleId() != null) {
            Salle salle = salleRepository.findById(request.getSalleId())
                    .orElseThrow(() -> new RuntimeException("Salle introuvable"));
            reservation.setSalle(salle);
        }

        if (request.getMaterielId() != null) {
            Materiel materiel = materielRepository.findById(request.getMaterielId())
                    .orElseThrow(() -> new RuntimeException("Matériel introuvable"));
            reservation.setMateriel(materiel);
        }

        reservation.setStatut(StatutReservation.EN_ATTENTE);
        Reservation saved = reservationRepository.save(reservation);

        return ReservationMapper.toResponseDTO(saved);
    }

    @Override
    public List<ReservationResponseDTO> consulterPlanning() {
        return reservationRepository.findAll()
                .stream()
                .map(ReservationMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<ReservationResponseDTO> consulterMesReservations(Long utilisateurId) {
        User user = userRepository.findById(utilisateurId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        if (user.getRole() != UserRole.ENSEIGNANT && user.getRole() != UserRole.ENSEIGNANT_RESPONSABLE) {
            throw new RuntimeException("Seuls les enseignants peuvent consulter leurs réservations.");
        }
        return reservationRepository.findByUtilisateur(user)
                .stream()
                .map(ReservationMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<ReservationResponseDTO> consulterPlanningFormation(User user) {
        if (user.getRole() != UserRole.ENSEIGNANT_RESPONSABLE) {
            throw new RuntimeException("Seul un enseignant responsable peut consulter le planning de formation.");
        }
        return reservationRepository.findAll()
                .stream()
                .map(ReservationMapper::toResponseDTO)
                .toList();
    }

    @Override
    public void validerReservation(Long id) {
        Reservation res = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));
        res.setStatut(StatutReservation.VALIDEE);
        if (res.getSalle() != null) {
            salleService.updateSalleDisponibilite(res.getSalle().getId(), false);
        }
        reservationRepository.save(res);
    }

    @Override
    public void refuserReservation(Long id) {
        Reservation res = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Réservation introuvable"));
        res.setStatut(StatutReservation.REFUSEE);
        reservationRepository.save(res);
    }
}