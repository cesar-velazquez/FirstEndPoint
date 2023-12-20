const express = require('express')
const { findAll, Create, GetOne, Patch, Delete, login, changePassword } = require('./users-Controller.js')
const usersMiddleware = require('./users-Middleware.js');

// Ruta Get

const router = express.Router()

router.post('/users', Create);

router.post('/users/login', login);


router.use(usersMiddleware.protect)

router.patch('/users/changed-password', changePassword);

router.get('/users', findAll);

router.get('/users/:id', usersMiddleware.restrictTo('developer', 'employee'), usersMiddleware.validateUserExists, GetOne)

router.patch('/users/:id', usersMiddleware.validateUserExists, usersMiddleware.protectAccountOwner, Patch)

router.delete('/users/:id', usersMiddleware.validateUserExists, usersMiddleware.protectAccountOwner,  Delete)

module.exports = router;