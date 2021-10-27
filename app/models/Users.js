const { DataTypes } = require('sequelize');
const sequelize = require('../../database/Database')

const Users = sequelize.define('users', ({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,  
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role : {
    type: DataTypes.ENUM(['admin', 'user']),
    allowNull: false,
  }
}))

// Users.associate = models => {
//   Users.hasMany(models.Articles, {
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
// };

module.exports = Users