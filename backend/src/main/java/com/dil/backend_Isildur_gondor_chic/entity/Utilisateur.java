package com.dil.backend_Isildur_gondor_chic.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "utilisateur")
@Data
public class Utilisateur implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pseudo", nullable = false, length = 250)
    private String pseudo;

    @Column(name = "mdp", nullable = false, length = 250)
    private String mdp;

    @Column(name = "nom", nullable = false, length = 250)
    private String nom;

    @Column(name = "prenom", nullable = false, length = 250)
    private String prenom;

    public Utilisateur() {}

    public Utilisateur(String pseudo, String mdp, String nom, String prenom) {
        this.pseudo = pseudo;
        this.mdp = mdp;
        this.nom = nom;
        this.prenom = prenom;
    }


    @Override
    public String toString() {
        return "Utilisateur{" +
                "id=" + id +
                ", pseudo='" + pseudo + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                '}';
    }
}
