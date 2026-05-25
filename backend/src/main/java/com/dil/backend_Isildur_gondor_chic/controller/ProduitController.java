package com.dil.backend_Isildur_gondor_chic.controller;

import com.dil.backend_Isildur_gondor_chic.dto.ApiResponseDTO;
import com.dil.backend_Isildur_gondor_chic.entity.Produit;
import com.dil.backend_Isildur_gondor_chic.service.ProduitService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping("/du-jour")
    public ResponseEntity<ApiResponseDTO<List<Produit>>> getProduitsDuJour() {
        try {
            List<Produit> produits = produitService.listerProduitsDuJour();

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(true,
                            produits.isEmpty()
                                    ? "Aucun produit du jour disponible."
                                    : produits.size() + " produit(s) du jour disponible(s).",
                            produits,
                            produits.size())
            );

        } catch (Exception e) {
            log.error("Erreur getProduitsDuJour : {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(false, "Impossible de récupérer les produits du jour."));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Produit>> getProduitById(@PathVariable Long id) {

        if (id <= 0) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponseDTO<>(false, "L'identifiant du produit est invalide."));
        }

        try {
            return produitService.findById(id)
                    .map(p -> ResponseEntity.ok(
                            new ApiResponseDTO<>(true, "Produit trouvé.", p)
                    ))
                    .orElseGet(() -> ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body(new ApiResponseDTO<>(false, "Aucun produit trouvé avec l'identifiant : " + id))
                    );

        } catch (Exception e) {
            log.error("Erreur getProduitById({}) : {}", id, e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(false, "Une erreur interne est survenue."));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<Produit>>> getAllProduits() {
        try {
            List<Produit> produits = produitService.findAll();

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(true,
                            produits.size() + " produit(s) trouvé(s).",
                            produits,
                            produits.size())
            );

        } catch (Exception e) {
            log.error("Erreur getAllProduits : {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(false, "Impossible de récupérer la liste des produits."));
        }
    }
}
