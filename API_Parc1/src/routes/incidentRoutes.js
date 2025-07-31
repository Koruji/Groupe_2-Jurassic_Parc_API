const express = require('express');
const incidentController = require('../controllers/incidentController');

const router = express.Router();

// GET /api/incidents - Get all incidents
router.get('/', incidentController.getAllIncidents);

// GET /api/incidents/:id - Get incident by ID
router.get('/:id', incidentController.getIncidentById);

// POST /api/incidents - Create new incident
router.post('/', incidentController.createIncident);

// PUT /api/incidents/:id - Update incident
router.put('/:id', incidentController.updateIncident);

// DELETE /api/incidents/:id - Delete incident
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;
