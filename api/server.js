import express, { urlencoded, json } from 'express'
import { createServer } from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express();
const server = createServer(app)
const API_KEY = process.env.API_KEY

app.use(urlencoded({
    extended: true
}))
app.use(json())

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// app.use(express.static(path.join(__dirname, '../../dist')))

// Enable CORS for all routes
app.use(cors({
    origin: ['https://qrency.vercel.app', 'http://localhost:5173'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

export default app