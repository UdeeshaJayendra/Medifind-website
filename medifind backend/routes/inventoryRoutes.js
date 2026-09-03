import express from 'express';
import { addMedicineToInventory, getMyInventory ,deleteFromInventory} from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// Apply 'protect' to these routes
router.post('/add', protect, addMedicineToInventory); 
router.get('/my-medicines', protect, getMyInventory); 
router.delete('/:id', protect, deleteFromInventory);



export default router;