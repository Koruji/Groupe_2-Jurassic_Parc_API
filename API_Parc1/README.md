# Jurassic Park API (API_Parc1)

Une API REST simple construite avec Express.js, Sequelize ORM, MySQL et Docker pour gérer un parc de dinosaures.

## Fonctionnalités

- **Dinosaures**: CRUD complet pour la gestion des dinosaures
- **Incidents**: Gestion des incidents du parc avec assignation aux gardiens
- **Gardiens**: Gestion du personnel du parc avec spécialités

## Structure du projet

```
API_Parc1/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── dinosaureController.js
│   │   ├── incidentController.js
│   │   └── gardienController.js
│   ├── models/
│   │   ├── Dinosaure.js
│   │   ├── Incident.js
│   │   ├── Gardien.js
│   │   └── index.js
│   ├── routes/
│   │   ├── dinosaureRoutes.js
│   │   ├── incidentRoutes.js
│   │   └── gardienRoutes.js
│   └── app.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env
```

## Installation et démarrage

### Avec Docker (recommandé)

1. Construire et démarrer les conteneurs:
```bash
docker-compose up --build
```

2. L'API sera disponible sur `http://localhost:3000`

### Sans Docker

1. Installer les dépendances:
```bash
npm install
```

2. Configurer la base de données MySQL et mettre à jour le fichier `.env`

3. Démarrer l'application:
```bash
npm start
```

## Endpoints API

### Dinosaures
- `GET /api/dinosaures` - Récupérer tous les dinosaures
- `GET /api/dinosaures/:id` - Récupérer un dinosaure par ID
- `POST /api/dinosaures` - Créer un nouveau dinosaure
- `PUT /api/dinosaures/:id` - Mettre à jour un dinosaure
- `DELETE /api/dinosaures/:id` - Supprimer un dinosaure

### Incidents
- `GET /api/incidents` - Récupérer tous les incidents
- `GET /api/incidents/:id` - Récupérer un incident par ID
- `POST /api/incidents` - Créer un nouveau incident
- `PUT /api/incidents/:id` - Mettre à jour un incident
- `DELETE /api/incidents/:id` - Supprimer un incident

### Gardiens
- `GET /api/gardiens` - Récupérer tous les gardiens
- `GET /api/gardiens/:id` - Récupérer un gardien par ID
- `POST /api/gardiens` - Créer un nouveau gardien
- `PUT /api/gardiens/:id` - Mettre à jour un gardien
- `DELETE /api/gardiens/:id` - Supprimer un gardien

### Health Check
- `GET /health` - Vérifier le statut de l'API

## Exemples de données

### Créer un dinosaure
```json
{
  "name": "Rex",
  "species": "Tyrannosaurus Rex",
  "enclosure": "enclosure-1",
  "healthStatus": "healthy",
  "lastFedAt": "2024-01-15T10:30:00Z",
  "dangerLevel": 9
}
```

### Créer un incident
```json
{
  "type": "escape",
  "severity": "critical",
  "location": "Sector A1",
  "assignedKeeper": "keeper-uuid",
  "status": "open"
}
```

### Créer un gardien
```json
{
  "name": "John Hammond",
  "specialty": "carnivores",
  "sector": "A1",
  "available": true,
  "experience": 8
}
```
