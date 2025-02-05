require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para aceitar JSON no corpo das requisições

// Conectar ao MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário
    password: '826300', // Coloque sua senha
    database: 'financeiro'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

// Rota para buscar todas as transações
app.get('/transacoes', (req, res) => {
    db.query('SELECT * FROM transacoes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Rota para adicionar uma transação
app.post('/transacoes', (req, res) => {
    const { data, descricao, valor, categoria, tipo } = req.body;
    const sql = 'INSERT INTO transacoes (data, descricao, valor, categoria, tipo) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [data, descricao, valor, categoria, tipo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Transação adicionada!', id: result.insertId });
    });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
