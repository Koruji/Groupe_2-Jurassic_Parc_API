const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dinosaureRoutes = require('./routes/dinosaureRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const gardienRoutes = require('./routes/gardienRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dinosaures', dinosaureRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/gardiens', gardienRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jurassic Park API is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
