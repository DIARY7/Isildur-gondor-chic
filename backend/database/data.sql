INSERT INTO utilisateur (pseudo, mdp, nom, prenom) VALUES
('Diaristote', 'di123', 'Aristote', 'Didinounours'),
('princesseNante', 'nante123', 'Princesse', 'Nante'),
('ladyBecca', 'becca123', 'Lady', 'Becca');

INSERT INTO produit (libelle, est_du_jour, prix, qte_stock, img, description) VALUES
(
    'Potion de Sang de Dragon', 
    True, 
    12.50, 
    25, 
    'sang-de-dragon.jpg', 
    'Une potion rare qui confere une force surhumaine et une resistance au feu.'
),
(
    'Sabre Valyrienne', 
    True, 
    299.99, 
    5, 
    'epee-valirienne.png', 
    'Une lame legendaire forgee en acier valyrien qui ne se brise jamais.'
),
(
    'Œuf de Dragon Targaryen', 
    False, 
    500.00, 
    3, 
    'oeuf-dragon.jpg', 
    'Un oeuf de dragon petrifie aux ecailles irisees changeant de couleur.'
);