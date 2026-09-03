import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const inspectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("=== Connected to MongoDB ===\n");

        // Get the raw collection (bypassing Mongoose models)
        const db = mongoose.connection.db;
        const pharmaciesCollection = db.collection('pharmacies');

        // Get one document as-is from the database
        const rawPharmacy = await pharmaciesCollection.findOne({});

        if (rawPharmacy) {
            console.log("=== RAW PHARMACY DOCUMENT (First One) ===");
            console.log(JSON.stringify(rawPharmacy, null, 2));
            console.log("\n=== FIELD CHECK ===");
            console.log("Has pharmacyName?", 'pharmacyName' in rawPharmacy, `(value: "${rawPharmacy.pharmacyName}")`);
            console.log("Has phoneNumber?", 'phoneNumber' in rawPharmacy, `(value: "${rawPharmacy.phoneNumber}")`);
            console.log("Has address?", 'address' in rawPharmacy, `(value: "${rawPharmacy.address}")`);
            console.log("Has email?", 'email' in rawPharmacy, `(value: "${rawPharmacy.email}")`);
        } else {
            console.log("No pharmacies found in database");
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

inspectDB();
