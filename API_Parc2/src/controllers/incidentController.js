const { Incident, Gardien } = require('../models');

const incidentController = {
  // GET /api/incidents - Get all incidents
  getAllIncidents: async (req, res) => {
    try {
      const incidents = await Incident.findAll({
        include: [{
          model: Gardien,
          as: 'keeper',
          attributes: ['id', 'name', 'specialty']
        }]
      });
      res.json(incidents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/incidents/:id - Get incident by ID
  getIncidentById: async (req, res) => {
    try {
      const incident = await Incident.findByPk(req.params.id, {
        include: [{
          model: Gardien,
          as: 'keeper',
          attributes: ['id', 'name', 'specialty']
        }]
      });
      if (!incident) {
        return res.status(404).json({ error: 'Incident not found' });
      }
      res.json(incident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/incidents - Create new incident
  createIncident: async (req, res) => {
    try {
      const incident = await Incident.create(req.body);
      const createdIncident = await Incident.findByPk(incident.id, {
        include: [{
          model: Gardien,
          as: 'keeper',
          attributes: ['id', 'name', 'specialty']
        }]
      });
      res.status(201).json(createdIncident);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // PUT /api/incidents/:id - Update incident
  updateIncident: async (req, res) => {
    try {
      const [updated] = await Incident.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedIncident = await Incident.findByPk(req.params.id, {
          include: [{
            model: Gardien,
            as: 'keeper',
            attributes: ['id', 'name', 'specialty']
          }]
        });
        res.json(updatedIncident);
      } else {
        res.status(404).json({ error: 'Incident not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE /api/incidents/:id - Delete incident
  deleteIncident: async (req, res) => {
    try {
      const deleted = await Incident.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Incident not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = incidentController;
