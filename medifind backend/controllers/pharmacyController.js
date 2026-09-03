import Pharmacy from '../models/Pharmacy.js';
import Medicine from '../models/Medicine.js';
import Inventory from '../models/Inventory.js';

// 1. Create a Pharmacy (For setup)
export const registerPharmacy = async (req, res) => {
  try {
    // coordinates must be [Longitude, Latitude]
    const { name, address, latitude, longitude } = req.body;

    const pharmacy = await Pharmacy.create({
      name,
      address,
      location: { type: 'Point', coordinates: [longitude, latitude] }
    });
    res.status(201).json(pharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Add Stock (Link a medicine to a pharmacy)
export const updateStock = async (req, res) => {
  try {
    const { pharmacyId, medicineId, status } = req.body;

    // Check if inventory record exists, if so update, else create
    let inventory = await Inventory.findOne({ pharmacy: pharmacyId, medicine: medicineId });

    if (inventory) {
      inventory.status = status;
      inventory.updatedAt = Date.now();
      await inventory.save();
    } else {
      inventory = await Inventory.create({
        pharmacy: pharmacyId,
        medicine: medicineId,
        status
      });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Get generic nearby pharmacies (for selecting specific pharmacy)
export const getNearbyPharmacies = async (req, res) => {
  try {
    const { lat, long } = req.query;
    const MAX_DISTANCE_METERS = 10000; // 10km

    if (!lat || !long) {
      return res.status(400).json({ message: "Latitude and Longitude are required." });
    }

    const nearbyPharmacies = await Pharmacy.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
          $maxDistance: MAX_DISTANCE_METERS
        }
      }
    }).select('pharmacyName ownerName email phoneNumber address location openingHours profilePicture');

    res.json(nearbyPharmacies);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};