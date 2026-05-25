package com.dil.backend_Isildur_gondor_chic.entity;

import lombok.Data;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produit")
@Data
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "libelle", nullable = false, length = 250)
    private String libelle;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "est_du_jour")
    private Boolean estDuJour = false;

    @Column(name = "prix", nullable = false, precision = 15, scale = 2)
    private BigDecimal prix;

    @Column(name = "qte_stock", nullable = false)
    private Integer qteStock;

    @Column(name = "img", nullable = false, length = 250)
    private String img;

    public Produit() {}

    public Produit(String libelle, Boolean estDuJour, BigDecimal prix, Integer qteStock, String img, String description) {
        this.libelle = libelle;
        this.estDuJour = estDuJour;
        this.prix = prix;
        this.qteStock = qteStock;
        this.img = img;
        this.description = description;
    }


    @Override
    public String toString() {
        return "Produit{" +
                "id=" + id +
                ", libelle='" + libelle + '\'' +
                ", estDuJour=" + estDuJour +
                ", prix=" + prix +
                ", qteStock=" + qteStock +
                ", description='" + description + '\'' +
                '}';
    }
}
