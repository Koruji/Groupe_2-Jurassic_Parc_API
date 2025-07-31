const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./config/database');
// Import models to ensure they are loaded
require('./models');
const dinosaureRoutes = require('./routes/dinosaureRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const gardienRoutes = require('./routes/gardienRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/dinosaures', dinosaureRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/gardiens', gardienRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jurassic Park API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Database connection and server start with retry logic
const startServer = async () => {
  const maxRetries = 10;
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      
      await sequelize.sync({ force: false });
      console.log('Database synchronized successfully.');
      
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
      });
      return; // Exit the retry loop on success
    } catch (error) {
      retries++;
      console.error(`Database connection attempt ${retries}/${maxRetries} failed:`, error.message);
      
      if (retries >= maxRetries) {
        console.error('Max retries reached. Unable to connect to the database.');
        process.exit(1);
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, retries), 30000);
      console.log(`Retrying in ${waitTime/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

startServer();
