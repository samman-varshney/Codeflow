if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

const { createWorkflow } = require('./controllers/workflowController');

app.use(cors({
  origin: 'https://codeflow-one.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.json({ message: 'your request is accepted' })
})

app.post('/api/query', async (req, res) => {
    const { prompt } = req.body;
    const result = await geminiModel.generateContent(prompt);
    const message = result.response.candidates[0].content.parts[0].text;
    res.json({ message: message });
})

app.post('/api/generate/workflow', createWorkflow);

app.listen(3000, () => {
    console.log('serving at http://localhost:3000');
})      
