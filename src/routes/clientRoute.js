import express from 'express';
import clienteSchema from '../models/clienteSchema.js';

const router = express.Router();

// Crear nuevo cliente
router.post('/', async (req, res) => {
  try {
    const cliente = new clienteSchema(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await clienteSchema.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un cliente específico
router.get('/:id', async (req, res) => {
  try {
    const cliente = await clienteSchema.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await clienteSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await clienteSchema.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Renovar membresía
router.post('/:id/renovar', async (req, res) => {
  try {
    const cliente = await clienteSchema.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    const nuevaFechaVencimiento = new Date(cliente.fechaVencimiento);
    nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 30);
    cliente.fechaVencimiento = nuevaFechaVencimiento;
    cliente.activo = true;

    await cliente.save();
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
