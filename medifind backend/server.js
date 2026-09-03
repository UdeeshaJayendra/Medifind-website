import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { checkInteraction } from './controllers/InteractionChecker.js';

dotenv.config();
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post('/api/interaction', checkInteraction);
// Routes
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));