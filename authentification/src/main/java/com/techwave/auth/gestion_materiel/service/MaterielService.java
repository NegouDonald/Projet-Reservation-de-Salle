package com.techwave.auth.gestion_materiel.service;

import com.techwave.auth.gestion_materiel.model.Materiel;
import com.techwave.auth.gestion_materiel.model.MaterialType;
import com.techwave.auth.gestion_materiel.repository.MaterielRepository;
import com.techwave.auth.gestion_materiel.repository.MaterialTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterielService {

    @Autowired
    private MaterielRepository materielRepository;

    @Autowired
    private MaterialTypeRepository materialTypeRepository;

    // Créer un nouveau matériel
    public Materiel createMateriel(Materiel materiel) {
        if (materiel.getType() == null || materiel.getType().trim().isEmpty()) {
            throw new RuntimeException("Le type de matériel doit être spécifié");
        }
        if (materiel.getMaterialType() == null || materiel.getMaterialType().getId() == null) {
            throw new RuntimeException("Le type de matériel (MaterialType) doit être spécifié");
        }
        Optional<MaterialType> materialType = materialTypeRepository.findById(materiel.getMaterialType().getId());
        if (!materialType.isPresent()) {
            throw new RuntimeException("Type de matériel non trouvé");
        }
        materiel.setMaterialType(materialType.get());
        return materielRepository.save(materiel);
    }

    // Obtenir tous les matériels
    public List<Materiel> getAllMateriels() {
        return materielRepository.findAll();
    }

    // Obtenir un matériel par ID
    public Optional<Materiel> getMaterielById(Long id) {
        return materielRepository.findById(id);
    }

    // Mettre à jour un matériel
    public Materiel updateMateriel(Long id, Materiel materielDetails) {
        Materiel materiel = materielRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matériel non trouvé avec l'ID : " + id));

        if (materielDetails.getType() == null || materielDetails.getType().trim().isEmpty()) {
            throw new RuntimeException("Le type de matériel doit être spécifié");
        }
        if (materielDetails.getMaterialType() == null || materielDetails.getMaterialType().getId() == null) {
            throw new RuntimeException("Le type de matériel (MaterialType) doit être spécifié");
        }
        Optional<MaterialType> materialType = materialTypeRepository.findById(materielDetails.getMaterialType().getId());
        if (!materialType.isPresent()) {
            throw new RuntimeException("Type de matériel non trouvé");
        }

        materiel.setType(materielDetails.getType());
        materiel.setMaterialType(materialType.get());

        return materielRepository.save(materiel);
    }

    // Supprimer un matériel
    public void deleteMateriel(Long id) {
        Materiel materiel = materielRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matériel non trouvé avec l'ID : " + id));

        if (!materiel.getReservations().isEmpty()) {
            throw new RuntimeException("Impossible de supprimer un matériel avec des réservations");
        }

        materielRepository.deleteById(id);
    }
}