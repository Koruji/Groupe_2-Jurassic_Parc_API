const { Dinosaure } = require('../models');

const dinosaureController = {
  // GET /api/dinosaures - Get all dinosaures
  getAllDinosaures: async (req, res) => {
    try {
      const dinosaures = await Dinosaure.findAll();
      res.json(dinosaures);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/dinosaures/:id - Get dinosaure by ID
  getDinosaureById: async (req, res) => {
    try {
      const dinosaure = await Dinosaure.findByPk(req.params.id);
      if (!dinosaure) {
        return res.status(404).json({ error: 'Dinosaure not found' });
      }
      res.json(dinosaure);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/dinosaures - Create new dinosaure
  createDinosaure: async (req, res) => {
    try {
      const dinosaure = await Dinosaure.create(req.body);
      res.status(201).json(dinosaure);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // PUT /api/dinosaures/:id - Update dinosaure
  updateDinosaure: async (req, res) => {
    try {
      const [updated] = await Dinosaure.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedDinosaure = await Dinosaure.findByPk(req.params.id);
        res.json(updatedDinosaure);
      } else {
        res.status(404).json({ error: 'Dinosaure not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE /api/dinosaures/:id - Delete dinosaure
  deleteDinosaure: async (req, res) => {
    try {
      const deleted = await Dinosaure.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Dinosaure not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = dinosaureController;
