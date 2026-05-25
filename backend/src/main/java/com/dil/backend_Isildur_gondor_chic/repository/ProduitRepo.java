package com.dil.backend_Isildur_gondor_chic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dil.backend_Isildur_gondor_chic.entity.Produit;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProduitRepo extends JpaRepository<Produit, Long> {

    // Recherche personnalisée : produits disponibles ET du jour
    @Query("SELECT p FROM Produit p WHERE p.estDuJour = true AND p.qteStock > 0")
    List<Produit> trouverProduitsDuJourDisponibles();

    // Recherche personnalisée avec paramètres multiples
    @Query("SELECT p FROM Produit p WHERE p.libelle LIKE %:keyword% AND p.prix <= :prixMax AND p.qteStock > 0")
    List<Produit> rechercherProduitsDisponibles(@Param("keyword") String keyword, @Param("prixMax") BigDecimal prixMax);
}
