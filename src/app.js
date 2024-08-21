const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 8080;
const IP = "0.0.0.0";

// Configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'projeto-node', 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', 'projeto-node', 'public', 'index.html');
    res.sendFile(filePath);
});

// Create a new pool instance for PostgreSQL
const pool = new Pool({
    user: 'postgres', // Substitua por seu usuário PostgreSQL
    host: 'localhost',
    database: 'Reserva', // Nome do banco de dados
    password: 'postgres', // Substitua por sua senha PostgreSQL
    port: 5432,
});

// Define the /api/reserva POST route
app.post('/api/reserva', async (req, res) => {
    const { nome, email, data, quantidade } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO reservas (nome, email, data_reserva, quantidade_pessoas) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, data, quantidade]
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('Erro ao inserir reserva:', err);
        res.status(500).json({ success: false, message: 'Erro ao inserir reserva' });
    }
});

// Start the server
app.listen(PORT, IP, () => {
    console.log(`Servidor rodando em http://${IP}:${PORT}`);
});
