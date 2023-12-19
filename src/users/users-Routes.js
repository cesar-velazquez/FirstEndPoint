const express = require('express')
const { findAll, Create, GetOne, Patch, Delete, login } = require('./users-Controller.js')
const usersMiddleware = require('./users-Middleware.js');

// Ruta Get

const router = express.Router()

router.post('/users', Create);

router.post('/users/login', login);

router.get('/users', findAll);

router.get('/users/:id', usersMiddleware.validateUserExists, GetOne)

router.patch('/users/:id', usersMiddleware.validateUserExists, Patch)

router.delete('/users/:id', usersMiddleware.validateUserExists, Delete)

module.exports = router;