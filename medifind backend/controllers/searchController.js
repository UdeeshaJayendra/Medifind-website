import Medicine from '../models/Medicine.js';
import Inventory from '../models/Inventory.js';
import Pharmacy from '../models/Pharmacy.js';

export const findMedicineNearby = async (req, res) => {
  try {
    const { drugName, lat, long } = req.query;
    const MAX_DISTANCE_METERS = 5000; // 5km

    // Step 1: Find the Medicine ID based on the name user typed
    // We use regex for partial matching (case insensitive)
    const medicine = await Medicine.findOne({
      brandName: { $regex: drugName, $options: 'i' }
    });

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found in database." });
    }

    // Step 2: Find Pharmacies within 5km
    const nearbyPharmacies = await Pharmacy.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
          $maxDistance: MAX_DISTANCE_METERS
        }
      }
    });

    // Extract just the IDs of nearby pharmacies
    const pharmacyIds = nearbyPharmacies.map(p => p._id);

    // Step 3: Find Inventory items for this Drug AND these Pharmacies
    const availableStock = await Inventory.find({
      medicine: medicine._id,
      pharmacy: { $in: pharmacyIds },
      status: 'In Stock'
    }).populate('pharmacy', 'pharmacyName ownerName email phoneNumber address location openingHours profilePicture');

    // Step 4: Check for substitutes if no stock found
    if (availableStock.length === 0) {
      // Call a simplified generic search (Optional logic here)
      return res.json({
        message: "Exact brand out of stock nearby.",
        suggestion: `Try searching for generic: ${medicine.genericName}`
      });
    }

    res.json(availableStock);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};