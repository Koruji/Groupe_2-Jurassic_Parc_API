const express = require('express');
const dinosaureController = require('../controllers/dinosaureController');

const router = express.Router();

// GET /api/dinosaures - Get all dinosaures
router.get('/', dinosaureController.getAllDinosaures);

// GET /api/dinosaures/:id - Get dinosaure by ID
router.get('/:id', dinosaureController.getDinosaureById);

// POST /api/dinosaures - Create new dinosaure
router.post('/', dinosaureController.createDinosaure);

// PUT /api/dinosaures/:id - Update dinosaure
router.put('/:id', dinosaureController.updateDinosaure);

// DELETE /api/dinosaures/:id - Delete dinosaure
router.delete('/:id', dinosaureController.deleteDinosaure);

module.exports = router;
