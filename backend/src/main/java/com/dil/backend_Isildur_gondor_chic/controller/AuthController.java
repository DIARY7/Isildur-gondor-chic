package com.dil.backend_Isildur_gondor_chic.controller;

import com.dil.backend_Isildur_gondor_chic.dto.ApiResponseDTO;
import com.dil.backend_Isildur_gondor_chic.dto.LoginRequestDTO;
import com.dil.backend_Isildur_gondor_chic.entity.Utilisateur;
import com.dil.backend_Isildur_gondor_chic.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final UtilisateurService utilisateurService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO<Utilisateur>> login(@RequestBody LoginRequestDTO dto) {

        if (dto.getPseudo() == null || dto.getPseudo().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponseDTO<>(false, "Le pseudo est obligatoire."));
        }

        if (dto.getMdp() == null || dto.getMdp().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponseDTO<>(false, "Le mot de passe est obligatoire."));
        }

        try {
            Utilisateur utilisateur = utilisateurService.identifier(dto);

            if (utilisateur == null) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponseDTO<>(false, "Pseudo ou mot de passe incorrect."));
            }

            // Masquer le mot de passe dans la réponse
            utilisateur.setMdp(null);

            return ResponseEntity.ok(
                    new ApiResponseDTO<>(true, "Connexion réussie.", utilisateur)
            );

        } catch (Exception e) {
            log.error("Erreur login : {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDTO<>(false, "Une erreur interne est survenue. Veuillez réessayer."));
        }
    }
}
