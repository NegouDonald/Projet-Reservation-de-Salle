package com.techwave.auth.gestion_materiel.model;

import com.techwave.auth.reservation.model.Reservation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Set;

@Entity
@Table(name = "materiels")
public class Materiel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Le type ne peut pas être vide")
    private String type; // "LAPTOP", "PROJECTOR"

    @ManyToOne
    @JoinColumn(name = "material_type_id")
    private MaterialType materialType;

    @OneToMany(mappedBy = "materiel")
    @JsonIgnore
    private Set<Reservation> reservations;

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public MaterialType getMaterialType() { return materialType; }
    public void setMaterialType(MaterialType materialType) { this.materialType = materialType; }
    public Set<Reservation> getReservations() { return reservations; }
    public void setReservations(Set<Reservation> reservations) { this.reservations = reservations; }
}