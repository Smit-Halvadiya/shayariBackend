import sequelize from '../db/index.js';  // Import the Sequelize instance from db/index.js
import { DataTypes } from 'sequelize';  // Import DataTypes to define model columns

// Define the Category model using sequelize.define()
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},
{
  tableName: 'categories',  // Explicitly define the table name
  timestamps: false,        // Disable Sequelize's default timestamps (createdAt, updatedAt)
});

export default Category;  // Export the Category model
