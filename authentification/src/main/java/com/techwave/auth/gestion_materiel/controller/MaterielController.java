package com.techwave.auth.gestion_materiel.controller;


import com.techwave.auth.gestion_materiel.model.Materiel;
import com.techwave.auth.gestion_materiel.service.MaterielService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materiels")
public class MaterielController {

    @Autowired
    private MaterielService materielService;

    // Créer un matériel
    @PostMapping
    public ResponseEntity<Materiel> createMateriel(@Valid @RequestBody Materiel materiel) {
        return ResponseEntity.ok(materielService.createMateriel(materiel));
    }

    // Lister tous les matériels
    @GetMapping
    public ResponseEntity<List<Materiel>> getAllMateriels() {
        return ResponseEntity.ok(materielService.getAllMateriels());
    }

    // Obtenir un matériel par ID
    @GetMapping("/{id}")
    public ResponseEntity<Materiel> getMaterielById(@PathVariable Long id) {
        return materielService.getMaterielById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Mettre à jour un matériel
    @PutMapping("/{id}")
    public ResponseEntity<Materiel> updateMateriel(@PathVariable Long id, @Valid @RequestBody Materiel materielDetails) {
        return ResponseEntity.ok(materielService.updateMateriel(id, materielDetails));
    }

    // Supprimer un matériel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMateriel(@PathVariable Long id) {
        materielService.deleteMateriel(id);
        return ResponseEntity.ok().build();
    }
}