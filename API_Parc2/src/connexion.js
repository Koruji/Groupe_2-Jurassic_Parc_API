const app = require('./app');
const { sequelize } = require('./config/database');

require('./models');

const PORT = process.env.PORT || 3000;

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
      return;
    } catch (error) {
      retries++;
      console.error(`Database connection attempt ${retries}/${maxRetries} failed:`, error.message);
      
      if (retries >= maxRetries) {
        console.error('Max retries reached. Unable to connect to the database.');
        process.exit(1);
      }
      
      const waitTime = Math.min(1000 * Math.pow(2, retries), 30000);
      console.log(`Retrying in ${waitTime / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
};

startServer();
