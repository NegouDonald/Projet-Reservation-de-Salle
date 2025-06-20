package com.techwave.auth.Gestion_salle.DTO;

public class SalleDTO {
    private Long id;
    private String nom;
    private int capacite;
    private String batiment;
    private boolean disponible;

    // Constructeurs
    public SalleDTO() {}

    public SalleDTO(Long id, String nom, int capacite, String batiment, boolean disponible) {
        this.id = id;
        this.nom = nom;
        this.capacite = capacite;
        this.batiment = batiment;
        this.disponible = disponible;
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public int getCapacite() { return capacite; }
    public void setCapacite(int capacite) { this.capacite = capacite; }
    public String getBatiment() { return batiment; }
    public void setBatiment(String batiment) { this.batiment = batiment; }
    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
}