const express = require('express');

const router = express.Router()

const {GetAllRepairs, CreateRepair, GetOneRepairs, PatchRepairs, DeleteRepairs} = require('./repairs.controller')

// Rutas
router.get('/api/v1/repairs', GetAllRepairs)

router.post('/api/v1/repairs', CreateRepair)

router.get('/api/v1/repairs/:id', GetOneRepairs)

router.patch('/api/v1/repairs/:id', PatchRepairs)

router.delete('/api/v1/repairs/:id', DeleteRepairs)

module.exports = router