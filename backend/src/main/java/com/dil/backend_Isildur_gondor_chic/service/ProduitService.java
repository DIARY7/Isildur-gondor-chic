package com.dil.backend_Isildur_gondor_chic.service;

import com.dil.backend_Isildur_gondor_chic.entity.Produit;
import com.dil.backend_Isildur_gondor_chic.repository.ProduitRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepo produitRepo;

    public List<Produit> listerProduitsDuJour() {
        return produitRepo.trouverProduitsDuJourDisponibles();
    }

    public Optional<Produit> findById(Long id) {
        return produitRepo.findById(id);
    }

    public List<Produit> findAll() {
        return produitRepo.findAll();
    }
}
