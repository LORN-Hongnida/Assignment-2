const express = require('express')
const router = express.Router()

// Import route modules
const userRoutes  = require('./users')

// Mounting routes
router.use('/users', userRoutes)

module.exports = router