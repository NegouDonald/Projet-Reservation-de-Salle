package com.techwave.auth.Gestion_salle.Repository;

import com.techwave.auth.Gestion_salle.model.Salle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {
    boolean existsByNomAndBatiment(String nom, String batiment);
}