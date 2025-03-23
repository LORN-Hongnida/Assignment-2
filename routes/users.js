// Teammates: LORN Hongnida, BRAK Sreytouch

const express = require('express')
const router = express.Router()
const pool = require('../db')

// Get all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
})

// Get single user by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`)
        if (rows.length === 0) {
            return res.status(404).json({message: 'User not found'})
        }
        res.json(rows[0])
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Post request 
router.post('/', async (req, res) => {
    try{
        const {username, email, password} = req.body
        const [rows] = await pool.query(`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})`)
        res.json(rows)
    } catch (error) {
    res.status(500).json({message:  error.message})
    } 
})

// Put request
router.put('/:id', async (req, res) => {
    try {
        const {username, email, password} = req.body
        const [rows] = await pool.query(`UPDATE users SET username = ${username}, email = ${email}, password = ${password} WHERE id = ${req.params.id}`) 
        res.json(rows)
    } catch (error) {
        res.status(500).json({message: req.message})
    }
}) 

// Patch request
router.patch('/:id', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let query = 'UPDATE users SET';
        const values = [];
        if (username) {
            query += `username = ${username}`;
        } 
        if (email) {
            query += `email = ${email}`;
        }
        if (password) {
            query += `password = ${password}`;
        }

        query += ` WHERE id = ${req.params.id}`;

        const [rows] = await pool.query(query, values);
        res.json(rows);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
// Delete request
router.delete('/:id', async (req, res) => {
    try {
        const [rows] =  await pool.query(`DELETE FROM users WHERE id = ${req.params.id}`);
        res.json(rows);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router