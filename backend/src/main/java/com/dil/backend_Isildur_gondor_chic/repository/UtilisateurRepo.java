package com.dil.backend_Isildur_gondor_chic.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dil.backend_Isildur_gondor_chic.entity.Utilisateur;


@Repository
public interface UtilisateurRepo extends JpaRepository<Utilisateur, Long> {
    // Vérifier si un pseudo existe déjà
    boolean existsByPseudo(String pseudo);
    Optional<Utilisateur> findByPseudo(String pseudo);

}
