package com.techwave.auth.Gestion_salle.Service;


import com.techwave.auth.Gestion_salle.Repository.SalleRepository;
import com.techwave.auth.Gestion_salle.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.techwave.auth.Gestion_salle.Repository.SalleRepository;
import com.techwave.auth.Gestion_salle.model.Salle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class SalleService {

    private static final Logger LOGGER = Logger.getLogger(SalleService.class.getName());

    @Autowired
    private SalleRepository salleRepository;

    public Salle createSalle(Salle salle) {
        LOGGER.info("Création de la salle : " + salle.getNom());
        if (salleRepository.existsByNomAndBatiment(salle.getNom(), salle.getBatiment())) {
            throw new RuntimeException("Une salle avec ce nom et ce bâtiment existe déjà");
        }
        if (salle.getCapacite() <= 0) {
            throw new RuntimeException("La capacité doit être supérieure à 0");
        }
        if (salle.getBatiment() == null || salle.getBatiment().trim().isEmpty()) {
            throw new RuntimeException("Le bâtiment doit être spécifié");
        }
        return salleRepository.save(salle);
    }

    public List<Salle> getAllSalles() {
        LOGGER.info("Récupération de toutes les salles");
        return salleRepository.findAll();
    }

    public Optional<Salle> getSalleById(Long id) {
        LOGGER.info("Récupération de la salle avec ID : " + id);
        return salleRepository.findById(id);
    }

    public Salle updateSalle(Long id, Salle salleDetails) {
        LOGGER.info("Mise à jour de la salle avec ID : " + id);
        Salle salle = salleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salle non trouvée avec l'ID : " + id));

        if (!salle.getNom().equals(salleDetails.getNom()) ||
                !salle.getBatiment().equals(salleDetails.getBatiment())) {
            if (salleRepository.existsByNomAndBatiment(salleDetails.getNom(), salleDetails.getBatiment())) {
                throw new RuntimeException("Une salle avec ce nom et ce bâtiment existe déjà");
            }
        }

        salle.setNom(salleDetails.getNom());
        salle.setCapacite(salleDetails.getCapacite());
        salle.setBatiment(salleDetails.getBatiment());
        salle.setDisponible(salleDetails.isDisponible());

        return salleRepository.save(salle);
    }

    public void deleteSalle(Long id) {
        LOGGER.info("Suppression de la salle avec ID : " + id);
        Salle salle = salleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salle non trouvée avec l'ID : " + id));

        if (!salle.getReservations().isEmpty()) {
            throw new RuntimeException("Impossible de supprimer une salle avec des réservations");
        }

        salleRepository.deleteById(id);
    }

    public void updateSalleDisponibilite(Long salleId, boolean disponible) {
        LOGGER.info("Mise à jour de la disponibilité de la salle ID : " + salleId);
        Salle salle = salleRepository.findById(salleId)
                .orElseThrow(() -> new RuntimeException("Salle non trouvée avec l'ID : " + salleId));
        salle.setDisponible(disponible);
        salleRepository.save(salle);
    }
}