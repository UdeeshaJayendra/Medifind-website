import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema({
  brandName: { type: String, required: true }, // e.g., Panadol
  genericName: { type: String, required: true }, // e.g., Paracetamol
  description: String
});

export default mongoose.model('Medicine', MedicineSchema);