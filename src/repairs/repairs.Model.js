const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database.js')
const Users = require('../users/users.model.js')

const repairs = sequelize.define('repairs', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motorsNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('disabled', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    userid: {
        foreignKey: true,
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await encryptedPassword(user.password);
            },
        },
    })

// repairs.Users = repairs.belongsTo(Users)

module.exports = repairs