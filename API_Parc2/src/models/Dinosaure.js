const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Dinosaure = sequelize.define('Dinosaure', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  enclosure: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  healthStatus: {
    type: DataTypes.ENUM('healthy', 'sick', 'critical'),
    allowNull: false,
    defaultValue: 'healthy'
  },
  lastFedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dangerLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  tableName: 'dinosaures',
  timestamps: true
});

module.exports = Dinosaure;
