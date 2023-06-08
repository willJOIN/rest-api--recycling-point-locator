import express from 'express';

import pool from './pool.js';
import routePontosColeta from './routes/pontos_coleta.js';

const app = express();
app.use(express.json());
app.use(routePontosColeta);

const port = 3000;

app.listen(port, () => {
    console.log("Servidor ativo na porta", port);
})