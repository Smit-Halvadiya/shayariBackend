import sequelize from '../db/index.js';  // Import the Sequelize instance from db/index.js
import { DataTypes } from 'sequelize';  // Import DataTypes to define model columns

// Define the Category model using sequelize.define()
const Shayari = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  tableName: 'shayari',  
  timestamps: false,        
});

export default Shayari;  
