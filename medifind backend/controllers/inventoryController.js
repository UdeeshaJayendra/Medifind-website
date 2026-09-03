import Inventory from '../models/Inventory.js';
import Medicine from '../models/Medicine.js';

export const addMedicineToInventory = async (req, res) => {
  const { brandName, genericName, description, status } = req.body;
  const pharmacyId = req.pharmacy._id; // Comes from the middleware

  try {
    // 1. Check if the Medicine exists globally in the database
    let medicine = await Medicine.findOne({ brandName });

    // 2. If not, create it globally first
    if (!medicine) {
      medicine = await Medicine.create({
        brandName,
        genericName,
        description
      });
    }

    // 3. Check if this pharmacy already has this medicine in stock
    const inventoryExists = await Inventory.findOne({
      pharmacy: pharmacyId,
      medicine: medicine._id
    });

    if (inventoryExists) {
      return res.status(400).json({ message: 'Medicine already in your inventory' });
    }

    // 4. Add to Inventory
    const newItem = await Inventory.create({
      pharmacy: pharmacyId,
      medicine: medicine._id,
      brandName: brandName,    
      genericName: genericName, 
      description: description,
      status: status || 'In Stock'
    });

    res.status(201).json(newItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all inventory for the logged-in pharmacy
// @route   GET /api/inventory/my-medicines
export const getMyInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ pharmacy: req.pharmacy._id })
      .populate('medicine', 'brandName genericName description');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete/Remove medicine from inventory
// @route   DELETE /api/inventory/:id
export const deleteFromInventory = async (req, res) => {
  try {
    const item = await Inventory.findOneAndDelete({ 
        _id: req.params.id,
        pharmacy: req.pharmacy._id // Ensure they only delete THEIR own item
    });

    if(!item) return res.status(404).json({message: "Item not found"});

    res.json({ message: 'Medicine removed from inventory' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};