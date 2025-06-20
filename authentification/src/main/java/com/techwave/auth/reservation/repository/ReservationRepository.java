package com.techwave.auth.reservation.repository;
import com.techwave.auth.reservation.model.Reservation;
import com.techwave.auth.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUtilisateur(User utilisateur);
    List<Reservation> findBySalleIdAndDateDebutLessThanEqualAndDateFinGreaterThanEqual(Long salleId, LocalDateTime dateFin, LocalDateTime dateDebut);
    List<Reservation> findByMaterielIdAndDateDebutLessThanEqualAndDateFinGreaterThanEqual(Long materielId, LocalDateTime dateFin, LocalDateTime dateDebut);
}