const express = require('express')
const app = express()

// Middleware
app.use(express.json())

// Import routes
const routes = require('./routes')

// Use routes
app.use('/api', routes)

app.listen(3000, () => console.log('Server listening at port 3000'))