import { Sequelize } from 'sequelize';

const sequelize =  
  new Sequelize(
    process.env.DATABASE,  // Database name from environment variables
    process.env.USER,      // MySQL username from environment variables
    process.env.PASSWORD,  // MySQL password from environment variables
    {
      host: process.env.HOST, // MySQL host (e.g., localhost)
      dialect: 'mysql',       // Dialect for Sequelize (mysql in this case)
    }
  );


// Test connection to MySQL
sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch((err) => console.error('Database connection failed:', err));

export default sequelize;  // Export Sequelize instance as default
