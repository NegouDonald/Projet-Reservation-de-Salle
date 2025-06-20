package com.techwave.auth.gestion_materiel.repository;

import com.techwave.auth.gestion_materiel.model.MaterialType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialTypeRepository extends JpaRepository<MaterialType, Long> {
    boolean existsByName(String name);
}