const express = require('express');
const gardienController = require('../controllers/gardienController');

const router = express.Router();

// GET /api/gardiens - Get all gardiens
router.get('/', gardienController.getAllGardiens);

// GET /api/gardiens/:id - Get gardien by ID
router.get('/:id', gardienController.getGardienById);

// POST /api/gardiens - Create new gardien
router.post('/', gardienController.createGardien);

// PUT /api/gardiens/:id - Update gardien
router.put('/:id', gardienController.updateGardien);

// DELETE /api/gardiens/:id - Delete gardien
router.delete('/:id', gardienController.deleteGardien);

module.exports = router;
