import Pharmacy from '../models/Pharmacy.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

// Google OAuth client
const googleClient = new OAuth2Client(
  "1021227931270-50trr6ij37m65fkt624gr58m7usn5p3r.apps.googleusercontent.com"
);

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


// Register pharmacy (email/password)

export const registerPharmacy = async (req, res) => {
  try {
    const { pharmacyName, ownerName, email, password, phoneNumber, address, openingHours, latitude, longitude, profilePicture } = req.body;

    // Check if already exists
    const existing = await Pharmacy.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Pharmacy already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const location = {
      type: 'Point',
      coordinates: latitude && longitude ? [parseFloat(longitude), parseFloat(latitude)] : [0, 0]
    };

    const pharmacy = await Pharmacy.create({
      pharmacyName,
      ownerName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      openingHours,
      location,
      profilePicture: profilePicture || null
    });

    res.status(201).json({
      _id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      email: pharmacy.email,
      token: generateToken(pharmacy._id)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// Login pharmacy (email/password)

export const loginPharmacy = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pharmacy = await Pharmacy.findOne({ email });
    if (!pharmacy) return res.status(401).json({ message: 'Invalid email or password' });

    const match = pharmacy.password ? await bcrypt.compare(password, pharmacy.password) : false;
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    res.json({
      _id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      email: pharmacy.email,
      token: generateToken(pharmacy._id)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Google login pharmacy

export const googleLoginPharmacy = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Google token missing' });

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "1021227931270-50trr6ij37m65fkt624gr58m7usn5p3r.apps.googleusercontent.com"
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if pharmacy exists
    let pharmacy = await Pharmacy.findOne({ email });

    // If not, create a new pharmacy (Google user, no password)
    if (!pharmacy) {
      pharmacy = await Pharmacy.create({
        pharmacyName: name || 'Google Pharmacy',
        ownerName: name,
        email,
        password: null,
        phoneNumber: null,
        address: null,
        openingHours: null,
        location: { type: 'Point', coordinates: [0, 0] },
        profilePicture: picture || null
      });
    }

    res.json({
      _id: pharmacy._id,
      pharmacyName: pharmacy.pharmacyName,
      email: pharmacy.email,
      token: generateToken(pharmacy._id)
    });

  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
};


// Get all pharmacies

export const getPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find({});
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
