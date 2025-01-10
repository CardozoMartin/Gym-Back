import express from 'express';
import clienteSchema from '../models/clienteSchema.js';
import { deleteCliente, getClienteById, getClientes, postCliente, putCliente, renovarMembresia } from '../controller/clienteController.js';

const router = express.Router();

// Crear nuevo cliente
router.post('/',postCliente );

// Obtener todos los clientes
router.get('/', getClientes);

// Obtener un cliente específico
router.get('/:id', getClienteById);

// Actualizar cliente
router.put('/:id', putCliente);

// Eliminar cliente
router.delete('/:id', deleteCliente);

// Renovar membresía
router.post('/:id/renovar', renovarMembresia);

export default router;
