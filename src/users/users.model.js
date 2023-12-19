const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database/database.js');
const { encryptedPassword } = require('../config/plugin/encripted-password.plugin.js');


const Users = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {        
        type: DataTypes.STRING,
        // type: DataTypes.ENUM('client', 'developer', 'employee'),
        allowNull: false,
        defaultValue: 'client',
    },
    // status: {
    //     type: DataTypes.STRING,
    //     defaultValue: 'available'
    // }
    status: {
        type: DataTypes.ENUM('available', 'disabled'),
        defaultValue: 'available'
    }
},
    {
        hooks: {
            beforeCreate: async (users) => {
                users.password = await encryptedPassword(users.password);
            },
        },
    });



module.exports = Users