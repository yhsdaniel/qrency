import { createRequire } from 'module'
import express from 'express'
import cors from 'cors'

const require = createRequire(import.meta.url)
require('dotenv').config()

const app = express();
app.use(express.json())
const API_KEY = process.env.API_KEY

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:5173', 'https://qrency.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Basic root route
app.get('/api/currencies', async (req, res) => {
    try {
        const response = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${API_KEY}`)
        const curr = await response.json()
        res.json(curr)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.post('/api/convert', async (req, res) => {
    const { base, foreign, amount } = req.query

    try {
        const response = await fetch(`https://api.currencybeacon.com/v1/convert?api_key=${API_KEY}&from=${base}&to=${foreign}&amount=${amount}`)
        const convertCurr = await response.json()
        res.json(convertCurr.response)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
