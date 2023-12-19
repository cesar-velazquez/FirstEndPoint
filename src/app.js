const express = require('express')
const usersRoutes = require('./users/users-Routes')
const RepairsRoutes = require('./repairs/repairs.routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', usersRoutes)
app.use('/', RepairsRoutes)


module.exports = app