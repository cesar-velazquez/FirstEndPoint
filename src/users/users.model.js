const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database.js')

const Users = sequelize.define('users', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('available', 'disabled'),
        allowNull: false,
        defaultValue: 'available'
    }

})

module.exports = Users