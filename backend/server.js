const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '826300',
    database: 'financeiro'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Rota para buscar todas as transações
app.get('/transacoes', (req, res) => {
    db.query('SELECT * FROM transacoes', (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// Rota para adicionar nova transação
app.post('/transacoes', (req, res) => {
    const { data, descricao, valor, categoria, tipo } = req.body;
    db.query('INSERT INTO transacoes (data, descricao, valor, categoria, tipo) VALUES (?, ?, ?, ?, ?)',
        [data, descricao, valor, categoria, tipo], 
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.json({ message: 'Transação adicionada com sucesso' });
            }
        }
    );
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
