import express from 'express';
import { checkInteraction } from '../controllers/InteractionChecker.js';

const router = express.Router();

// POST /api/interaction
router.post('/', checkInteraction);

export default router;
