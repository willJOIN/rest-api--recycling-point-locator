import express from 'express';
import mysql from 'mysql';

// Conn

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_api_recicla'
})

conn.connect((error) => {
    if (error) {
        console.error('Erro na conexao do db:\n' + err)
        return
    } 
    console.log('Conectou ao db!')
})

// Routes

const app = express();

app.get('/api-recicla/busca-ponto', (req, res) => {
    const material = req.query.material

    conn.query('SELECT * FROM pontos_coleta pc WHERE pc.material = ?', material, (error, rows) => {
        if (error) {
            console.error('Erro:\n' + error)
            res.status(500).json({ error: 'Erro interno'})
            return
        }
        else {
            res.json(rows)
        }
    })
})

app.get('/api-recicla/lista-pontos', (req, res) => {
    conn.query('SELECT * FROM pontos_coleta', (error, rows) => {
        if (error) {
            console.error('Erro:\n' + error)
            res.status(500).json({ error: 'Erro interno'})
            return
        }
        else {
            res.json(rows)
        }
    })
})

app.use(express.json())
app.post('/api-recicla/cria-ponto', (req, res) => {
    const { material, CEP } = req.body;


    const novoPonto = {
        material,
        CEP
    };

    conn.query('INSERT INTO pontos_coleta SET ?', novoPonto, (error, result) => {
        if (error) {
            console.error('Erro:\n' + error)
            res.status(500).json({ error: 'Erro interno'})
            return
        }
        else {
            res.status(201).json({ message: 'Criado'})
        }
    })
})

app.delete('/api-recicla/deleta-ponto', (req, res) => {
    const id = req.query.id

    conn.query('DELETE FROM pontos_coleta WHERE id = ?', id, (error, rows) => {
        if (error) {
            console.error('Erro:\n' + error)
            res.status(500).json({ error: 'Erro interno'})
            return
        }
        else {
            res.status(200).json({ message: 'Deletado'})
        }
    })
})

// Host

const port = 3000;

app.listen(port, () => {
    console.log("Servidor ativo na porta ", port);
})