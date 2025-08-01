const { Gardien, Incident } = require('../models');

const gardienController = {
  // GET /api/gardiens - Get all gardiens
  getAllGardiens: async (req, res) => {
    try {
      const gardiens = await Gardien.findAll({
        include: [{
          model: Incident,
          as: 'incidents',
          attributes: ['id', 'type', 'severity', 'status']
        }]
      });
      res.json(gardiens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/gardiens/:id - Get gardien by ID
  getGardienById: async (req, res) => {
    try {
      const gardien = await Gardien.findByPk(req.params.id, {
        include: [{
          model: Incident,
          as: 'incidents',
          attributes: ['id', 'type', 'severity', 'status', 'location']
        }]
      });
      if (!gardien) {
        return res.status(404).json({ error: 'Gardien not found' });
      }
      res.json(gardien);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/gardiens - Create new gardien
  createGardien: async (req, res) => {
    try {
      const gardien = await Gardien.create(req.body);
      res.status(201).json(gardien);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // PUT /api/gardiens/:id - Update gardien
  updateGardien: async (req, res) => {
    try {
      const [updated] = await Gardien.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedGardien = await Gardien.findByPk(req.params.id, {
          include: [{
            model: Incident,
            as: 'incidents',
            attributes: ['id', 'type', 'severity', 'status']
          }]
        });
        res.json(updatedGardien);
      } else {
        res.status(404).json({ error: 'Gardien not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE /api/gardiens/:id - Delete gardien
  deleteGardien: async (req, res) => {
    try {
      const deleted = await Gardien.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Gardien not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = gardienController;
