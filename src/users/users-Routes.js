const express = require('express')

const router = express.Router()

const { findAll, Create, GetOne, Patch, Delete } = require('./users-Controller')

// Ruta Get
router.get('/users', findAll)

router.post('/users', Create)

router.get('/users/:id', GetOne)

router.patch('/users/:id', Patch)

router.delete('/users/:id', Delete)

module.exports = router;