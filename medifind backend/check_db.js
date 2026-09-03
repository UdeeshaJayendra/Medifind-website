import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pharmacy from './models/Pharmacy.js';

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // Fetch the raw object without mongoose helpers to see exactly what's there
        // lean() returns the plain JS object
        const pharmacies = await Pharmacy.find({}).lean().limit(1);

        if (pharmacies.length > 0) {
            const p = pharmacies[0];
            console.log("--- DOCUMENT KEYS ---");
            Object.keys(p).forEach(key => console.log(key));

            console.log("\n--- VALUES ---");
            console.log("pharmacyName:", p.pharmacyName);
            console.log("name:", p.name);
            console.log("phoneNumber:", p.phoneNumber);
            console.log("contactNumber:", p.contactNumber);

            console.log("\n--- FULL DUMP ---");
            console.log(JSON.stringify(p, null, 2));
        } else {
            console.log("No pharmacies found in DB.");
        }

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkDB();
