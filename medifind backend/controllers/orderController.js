import Order from '../models/Order.js';
import Pharmacy from '../models/Pharmacy.js';
import sendEmail from '../utils/sendEmail.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { pharmacyId, userEmail, userPhone } = req.body;

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Prescription image is required" });
        }

        const prescriptionImage = req.file.path.replace(/\\/g, "/"); // Normalize path for Windows

        const newOrder = new Order({
            pharmacyId,
            userEmail,
            userPhone,
            prescriptionImage
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Get orders for a specific pharmacy
export const getPharmacyOrders = async (req, res) => {
    try {
        // Pharmacy is attached by 'protect' middleware
        const pharmacyId = req.pharmacy._id;

        const orders = await Order.find({ pharmacyId }).sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Confirm order and send email
export const confirmOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === 'confirmed') {
            return res.status(400).json({ message: "Order is already confirmed" });
        }

        order.status = 'confirmed';
        await order.save();

        // Send confirmation email
        const subject = "Your Medifind Order is Confirmed!";
        const text = `Hello,\n\nYour order with ID ${order._id} has been confirmed by the pharmacy. You can pick it up shortly.\n\nThank you for using Medifind.`;

        try {
            await sendEmail(order.userEmail, subject, text);
        } catch (emailErr) {
            console.error("Email sending failed:", emailErr);
       
        }

        res.json({ message: "Order confirmed and email sent.", order });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
