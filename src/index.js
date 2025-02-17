import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import clienteRoutes from './routes/clientRoute.js';

import './database/database.js'
const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/clientes', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });