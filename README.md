# Isildur Gondor Chic

Application fullstack avec :

- **Backend** : Spring Boot (`/backend`)
- **Frontend** : React (`/frontend`)

---

# 📦 Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé :

- Java 17+
- Maven
- Node.js 18+
- npm

---

# 📁 Structure du projet

```bash
Isildur-Gondor-Chic/
│
├── backend/    # Projet Spring Boot
│
└── frontend/   # Projet React

```

🚀 Lancer le Backend (Spring Boot)
1. Aller dans le dossier backend
cd backend
2. Lancer le projet Spring Boot

Avec Maven :
```bash
./mvnw spring-boot:run
```

Ou si Maven est installé globalement :
```bash
mvn spring-boot:run
```

Le backend démarrera généralement sur :

http://localhost:8081
⚛️ Lancer le Frontend (React)
1. Aller dans le dossier frontend
```bash
cd frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur React
```bash
npm run dev
```

Le frontend sera accessible sur :

http://localhost:5173
🔗 Communication Frontend ↔ Backend

Le frontend React communique avec le backend Spring Boot via des appels API.

Exemple :

Frontend : http://localhost:5173
Backend  : http://localhost:8081

