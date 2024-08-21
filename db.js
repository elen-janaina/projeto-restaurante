const { Client } = require('pg');

// Configurações de conexão
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Reserva',
    password: 'postgres',
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

module.exports = client;