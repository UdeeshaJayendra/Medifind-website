import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    pharmacyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacy',
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    userPhone: {
        type: String,
        required: true,
        trim: true
    },
    prescriptionImage: {
        type: String, // Path to the uploaded image
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', OrderSchema);
