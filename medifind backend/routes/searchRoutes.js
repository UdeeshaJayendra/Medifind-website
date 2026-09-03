import express from 'express';
import { findMedicineNearby } from '../controllers/searchController.js';

const router = express.Router();

// Endpoint: /api/search?drugName=Panadol&lat=6.927&long=79.861
router.get('/', findMedicineNearby);

export default router;