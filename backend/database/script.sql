CREATE TABLE utilisateur(
   id SERIAL,
   pseudo VARCHAR(250)  NOT NULL,
   mdp VARCHAR(250)  NOT NULL,
   nom VARCHAR(250)  NOT NULL,
   prenom VARCHAR(250)  NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE produit(
   id SERIAL,
   libelle VARCHAR(250)  NOT NULL,
   est_du_jour BOOLEAN DEFAULT False,
   prix NUMERIC(15,2)   NOT NULL,
   qte_stock INTEGER NOT NULL,
   img VARCHAR(250)  NOT NULL,
   PRIMARY KEY(id)
);
