import express from 'express';
import multer from 'multer';
import path from 'path';
import { createOrder, getPharmacyOrders, confirmOrder } from '../controllers/orderController.js';

const router = express.Router();

// Multer Config for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed!'));
    }
});

import { protect } from '../middleware/authMiddleware.js';

// Routes
router.post('/', upload.single('prescriptionImage'), createOrder);
router.get('/', protect, getPharmacyOrders); 
router.put('/:orderId/confirm', protect, confirmOrder);

export default router;
