import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Medicine from './models/Medicine.js';
import Pharmacy from './models/Pharmacy.js';
import Inventory from './models/Inventory.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected for Seeding...');

    // 1. Clear existing data
    await Medicine.deleteMany();
    await Pharmacy.deleteMany();
    await Inventory.deleteMany();

    // 2. Create a Medicine
    const panadol = await Medicine.create({
      brandName: "Panadol",
      genericName: "Paracetamol",
      description: "Pain reliever"
    });

    // 3. Create Pharmacies 
    // (Coordinates are examples near Colombo for demonstration)
    
    // Pharmacy A: Very close (Lotus Tower area)
    const pharmacyA = await Pharmacy.create({
      name: "Lotus Pharma (Nearby)",
      address: "Lotus Road",
      contactNumber: "011222333",
      location: { type: "Point", coordinates: [79.8585, 6.9271] } // [Long, Lat]
    });

    // Pharmacy B: Far away (Dehiwala area - >5km away)
    const pharmacyB = await Pharmacy.create({
      name: "Dehiwala Meds (Too Far)",
      address: "Galle Road",
      contactNumber: "011555666",
      location: { type: "Point", coordinates: [79.8650, 6.8511] } 
    });

    // 4. Add Stock (Both have Panadol)
    await Inventory.create({
      pharmacy: pharmacyA._id,
      medicine: panadol._id,
      status: "In Stock"
    });

    await Inventory.create({
      pharmacy: pharmacyB._id,
      medicine: panadol._id,
      status: "In Stock"
    });

    console.log('Data Imported! Pharmacy A is close, B is far.');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();