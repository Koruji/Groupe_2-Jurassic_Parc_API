const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Incident = sequelize.define('Incident', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('escape', 'malfunction', 'medical'),
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  assignedKeeper: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'gardiens',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('open', 'in-progress', 'resolved'),
    allowNull: false,
    defaultValue: 'open'
  }
}, {
  tableName: 'incidents',
  timestamps: true
});

module.exports = Incident;
