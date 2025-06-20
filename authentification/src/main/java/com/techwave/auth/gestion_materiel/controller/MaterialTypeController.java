package com.techwave.auth.gestion_materiel.controller;

import com.techwave.auth.gestion_materiel.model.MaterialType;
import com.techwave.auth.gestion_materiel.repository.MaterialTypeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/material-types")
public class MaterialTypeController {

    @Autowired
    private MaterialTypeRepository materialTypeRepository;

    // Créer un type de matériel
    @PostMapping
    public ResponseEntity<MaterialType> createMaterialType(@Valid @RequestBody MaterialType materialType) {
        if (materialTypeRepository.existsByName(materialType.getName())) {
            throw new RuntimeException("Un type de matériel avec ce nom existe déjà");
        }
        return ResponseEntity.ok(materialTypeRepository.save(materialType));
    }

    // Lister tous les types de matériels
    @GetMapping
    public ResponseEntity<List<MaterialType>> getAllMaterialTypes() {
        return ResponseEntity.ok(materialTypeRepository.findAll());
    }

    // Obtenir un type de matériel par ID
    @GetMapping("/{id}")
    public ResponseEntity<MaterialType> getMaterialTypeById(@PathVariable Long id) {
        return materialTypeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un type de matériel
    @PutMapping("/{id}")
    public ResponseEntity<MaterialType> updateMaterialType(@PathVariable Long id, @Valid @RequestBody MaterialType materialTypeDetails) {
        MaterialType materialType = materialTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Type de matériel non trouvé avec l'ID : " + id));

        if (!materialType.getName().equals(materialTypeDetails.getName()) &&
                materialTypeRepository.existsByName(materialTypeDetails.getName())) {
            throw new RuntimeException("Un type de matériel avec ce nom existe déjà");
        }

        materialType.setName(materialTypeDetails.getName());
        return ResponseEntity.ok(materialTypeRepository.save(materialType));
    }

    // Supprimer un type de matériel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterialType(@PathVariable Long id) {
        MaterialType materialType = materialTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Type de matériel non trouvé avec l'ID : " + id));
        materialTypeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}