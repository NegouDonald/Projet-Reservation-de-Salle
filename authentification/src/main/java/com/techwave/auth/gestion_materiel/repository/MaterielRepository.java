package com.techwave.auth.gestion_materiel.repository;

import com.techwave.auth.gestion_materiel.model.Materiel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterielRepository extends JpaRepository<Materiel, Long> {
}