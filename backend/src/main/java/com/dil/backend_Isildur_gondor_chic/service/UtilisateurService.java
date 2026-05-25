package com.dil.backend_Isildur_gondor_chic.service;

import com.dil.backend_Isildur_gondor_chic.dto.LoginRequestDTO;
import com.dil.backend_Isildur_gondor_chic.entity.Utilisateur;
import com.dil.backend_Isildur_gondor_chic.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepo utilisateurRepo;

    public Utilisateur identifier(LoginRequestDTO dto) {
        return utilisateurRepo.findByPseudo(dto.getPseudo())
                .filter(u -> u.getMdp().equals(dto.getMdp()))
                .orElse(null);
    }

}
