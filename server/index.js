import { createRequire } from 'module'
import express from 'express'
import cors from 'cors'

const require = createRequire(import.meta.url)
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all routes
app.use(cors());

// Basic root route
app.get('/currencies', async (req, res) => {
    try {
        const response = await fetch(`https://api.currencybeacon.com/v1/currencies?api_key=${process.env.API_KEY}`)
        const curr = await response.json()
        res.json(curr)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.post('/convert', async (req, res) => {
    const { base, foreign, amount } = req.query
    
    try {
        const response = await fetch(`https://api.currencybeacon.com/v1/convert?api_key=${process.env.API_KEY}&from=${base}&to=${foreign}&amount=${amount}`)
        const convertCurr = await response.json()
        res.json(convertCurr.response)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
