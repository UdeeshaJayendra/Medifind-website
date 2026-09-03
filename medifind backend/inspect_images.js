import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pharmacy from './models/Pharmacy.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const pharmacies = await Pharmacy.find({});
        console.log(`Found ${pharmacies.length} pharmacies.`);

        pharmacies.forEach(p => {
            console.log(`Pharmacy: ${p.pharmacyName || p.name}, ProfilePicture: '${p.profilePicture}'`);
        });

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
