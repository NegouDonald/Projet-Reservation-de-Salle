//package com.techwave.auth.model;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@Table(name = "materials")
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Builder
//public class Material {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String code; // Code d'inventaire, ex: ORDI-001
//
//    @ManyToOne
//    @JoinColumn(name = "type_id")
//    private MaterialType type;
//
//    private boolean available;
//}
