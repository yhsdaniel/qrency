import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const API_KEY = process.env.API_KEY

app.use(express.json())

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:5173', 'https://qrency.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get('/', (req, res) => {
    res.send({ message: 'Hello world!' });
})

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
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

export default app