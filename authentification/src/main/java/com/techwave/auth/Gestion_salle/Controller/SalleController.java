package com.techwave.auth.Gestion_salle.Controller;

import com.techwave.auth.Gestion_salle.Service.SalleService;
import com.techwave.auth.Gestion_salle.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.techwave.auth.Gestion_salle.Service.SalleService;
import com.techwave.auth.Gestion_salle.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/salles")
public class SalleController {

    private static final Logger LOGGER = Logger.getLogger(SalleController.class.getName());

    @Autowired
    private SalleService salleService;

    // Créer une salle
    @PostMapping
    public ResponseEntity<?> createSalle(@RequestBody Salle salle) {
        try {
            LOGGER.info("Tentative de création d'une salle : " + salle.getNom());
            Salle createdSalle = salleService.createSalle(salle);
            return ResponseEntity.ok(createdSalle);
        } catch (RuntimeException e) {
            LOGGER.severe("Erreur lors de la création de la salle : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Lister toutes les salles
    @GetMapping
    public ResponseEntity<?> getAllSalles() {
        try {
            LOGGER.info("Tentative de récupération de toutes les salles");
            List<Salle> salles = salleService.getAllSalles();
            return ResponseEntity.ok(salles);
        } catch (Exception e) {
            LOGGER.severe("Erreur lors de la récupération des salles : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la récupération des salles : " + e.getMessage());
        }
    }

    // Obtenir une salle par ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSalleById(@PathVariable Long id) {
        try {
            LOGGER.info("Tentative de récupération de la salle avec ID : " + id);
            return salleService.getSalleById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            LOGGER.severe("Erreur lors de la récupération de la salle ID " + id + " : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la récupération de la salle : " + e.getMessage());
        }
    }

    // Mettre à jour une salle
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSalle(@PathVariable Long id, @RequestBody Salle salleDetails) {
        try {
            LOGGER.info("Tentative de mise à jour de la salle avec ID : " + id);
            Salle updatedSalle = salleService.updateSalle(id, salleDetails);
            return ResponseEntity.ok(updatedSalle);
        } catch (RuntimeException e) {
            LOGGER.severe("Erreur lors de la mise à jour de la salle : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // Supprimer une salle
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalle(@PathVariable Long id) {
        try {
            LOGGER.info("Tentative de suppression de la salle avec ID : " + id);
            salleService.deleteSalle(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            LOGGER.severe("Erreur lors de la suppression de la salle : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}