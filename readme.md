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
 Staging (pré-prod)| [Lien Render Staging](https://staging-jurassic.render.com)  


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
