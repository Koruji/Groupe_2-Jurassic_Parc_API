const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Gardien = sequelize.define('Gardien', {
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
  specialty: {
    type: DataTypes.ENUM('carnivores', 'herbivores', 'medical', 'security'),
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  tableName: 'gardiens',
  timestamps: true
});

module.exports = Gardien;
