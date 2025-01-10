import clienteSchema from "../models/clienteSchema.js";

export const postCliente = async (req, res) => {
    try {
        const cliente = new clienteSchema(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getClientes = async (req, res) => {
  try {
    const clientes = await clienteSchema.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getClienteById = async (req, res) => {
  try {
    const cliente = await clienteSchema.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const putCliente = async (req, res) => {
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
}

export const deleteCliente = async (req, res) => {
  try {
    const cliente = await clienteSchema.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const renovarMembresia = async (req, res) => {
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
  }