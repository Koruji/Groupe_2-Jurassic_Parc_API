const Dinosaure = require('./Dinosaure');
const Incident = require('./Incident');
const Gardien = require('./Gardien');

// Define associations
Incident.belongsTo(Gardien, {
  foreignKey: 'assignedKeeper',
  as: 'keeper'
});

Gardien.hasMany(Incident, {
  foreignKey: 'assignedKeeper',
  as: 'incidents'
});

// Associations supprimées : aucun lien entre Incident et Gardien

module.exports = {
  Dinosaure,
  Incident,
  Gardien
};
