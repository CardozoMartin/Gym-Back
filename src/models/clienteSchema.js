import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: String,
  fechaInicio: { type: Date, default: Date.now },
  fechaVencimiento: { type: Date },
  activo: { type: Boolean, default: true }
});

// Middleware para calcular la fecha de vencimiento
clienteSchema.pre('save', function(next) {
  if (!this.fechaVencimiento) {
    this.fechaVencimiento = new Date(this.fechaInicio);
    this.fechaVencimiento.setDate(this.fechaVencimiento.getDate() + 30);
  }
  next();
});

export default mongoose.model('Cliente', clienteSchema);
