const client = require('./db');

async function insertUser(nome, email, data, quantidade) {
    try {
        const result = await pool.query(
            'INSERT INTO reservas (nome, email, data_reserva, quantidade_pessoas) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, email, data, quantidade]
        );
        console.log('Reserva inserida:', result.rows[0]);
    } catch (err) {
        console.error('Erro ao inserir reserva', err);
    }
}