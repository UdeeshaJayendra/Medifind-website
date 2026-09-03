import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pharmacy from './models/Pharmacy.js';

dotenv.config();

/**
 * Migration Script: Add missing fields to existing pharmacy documents
 * 
 * This script will:
 * 1. Find all pharmacies that are missing pharmacyName or phoneNumber
 * 2. Update them with default/placeholder values based on existing data
 */

const migratePharmacies = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // Find all pharmacies
        const pharmacies = await Pharmacy.find({}).lean();
        console.log(`Found ${pharmacies.length} pharmacies`);

        for (const pharmacy of pharmacies) {
            const updates = {};

            // Add pharmacyName if missing
            if (!pharmacy.pharmacyName) {
                // Use email as a temporary name
                updates.pharmacyName = pharmacy.email || pharmacy.name || `Pharmacy-${pharmacy._id}`;
                console.log(`  Adding pharmacyName: "${updates.pharmacyName}"`);
            }

            // Add ownerName if missing
            if (!pharmacy.ownerName) {
                updates.ownerName = "Owner"; // Placeholder
                console.log(`  Adding ownerName: "${updates.ownerName}"`);
            }

            // Add phoneNumber if missing
            if (!pharmacy.phoneNumber) {
                updates.phoneNumber = "000-000-0000"; // Placeholder
                console.log(`  Adding phoneNumber: "${updates.phoneNumber}"`);
            }

            // Add openingHours if missing
            if (!pharmacy.openingHours) {
                updates.openingHours = "9AM - 5PM"; // Placeholder
                console.log(`  Adding openingHours: "${updates.openingHours}"`);
            }

            // Perform update if there are changes
            if (Object.keys(updates).length > 0) {
                console.log(`Updating pharmacy ${pharmacy._id}...`);
                await Pharmacy.updateOne({ _id: pharmacy._id }, { $set: updates });
                console.log(`  ✓ Updated successfully\n`);
            } else {
                console.log(`Pharmacy ${pharmacy._id} already has all required fields\n`);
            }
        }

        console.log("Migration complete!");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migratePharmacies();
