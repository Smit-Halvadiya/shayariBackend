import sequelize from '../db/index.js';  // Import the Sequelize instance from db/index.js
import { DataTypes } from 'sequelize';  // Import DataTypes to define model columns

// Define the Category model using sequelize.define()
const PhotoShayari = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  photo_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},
{
  tableName: 'photo_shayari',  
  timestamps: false,        
});

export default PhotoShayari;  
