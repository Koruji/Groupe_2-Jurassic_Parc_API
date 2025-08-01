# Projet Jurassic Parc - Groupe 2

Bienvenue dans le dépôt officiel du projet Jurassic Parc développé par le Groupe 2 (Montpellier) dans le cadre de l'exercice DevOps & APIs.

##  Membres de l'équipe

- Hamid
- Jade
- Baptiste
- Noé

## Ville des campus concernés

- Montpellier


##  URLs

GitHub Project     [Lien vers le GitHub Project](https://github.com/Koruji/Groupe_2Jurassic_Parc_API)  
Production         [Lien Render API Parc 1](https://parc1-jurassic.render.com)  
                   [Lien Render API Parc 2](https://parc2-jurassic.render.com)  
Staging (pré-prod) [Lien Render Staging](https://staging-jurassic.render.com)  

---

## 🚀 Installation & Lancement local

### Prérequis
- **Docker Desktop** installé et lancé sur votre machine (Windows/Mac/Linux)
- **Make** installé (optionnel, mais recommandé pour simplifier les commandes)

### Lancement rapide

```bash
# À la racine du projet
make up
```
Cela va :
- Builder et lancer les 2 APIs (API_Parc1 sur http://localhost:3001, API_Parc2 sur http://localhost:3002)
- Démarrer 2 bases de données MySQL (pour chaque API)

Pour arrêter tous les services :
```bash
make down
```

### Structure multi-API
- `API_Parc1` : code source de la première API (Parc 1)
- `API_Parc2` : code source de la deuxième API (Parc 2)
- Chaque API a sa propre base de données et ses propres variables d'environnement (voir docker-compose.yml)

### Ports exposés
- API Parc 1 : http://localhost:3001
- API Parc 2 : http://localhost:3002
- MySQL Parc 1 : localhost:3307
- MySQL Parc 2 : localhost:3308

### Conseils
- Assurez-vous que **Docker Desktop** est bien démarré avant toute commande.
- Les fichiers `.env` dans chaque API permettent de surcharger la configuration si besoin.
- Pour ajouter des dépendances, modifiez le `package.json` de l'API concernée puis relancez le build.

---


##  Objectif du projet

Créer deux APIs Node.js simulant deux parcs différents du Jurassic Park avec :

- Une base de données pour chaque parc
- Des endpoints pour gérer : dinosaures, incidents et gardiens
- Une infrastructure Docker complète 
- Un pipeline CI/CD via GitHub Actions
- Un système Redis (cache) à intégrer


##  Stack technique

- **Backend : Node.js (Express)
- **Base de données : PostgreSQL
- **Cache : Redis
- **Conteneurisation : Docker + Docker Compose
- **CI/CD : GitHub Actions
- **Déploiement : Render


##  Structure du dépôt

```bash
.
├── docker-compose.yml
├── .github/
│   └── workflows/
│       ├── api-parc1.yml
│       └── api-parc2.yml
├── API_Parc1/
│   ├── src/
│   ├── ops/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── github-workflows/
│   └── package.json
├── API_Parc2/
│   ├── src/
│   ├── ops/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── github-workflows/
│   └── package.json
