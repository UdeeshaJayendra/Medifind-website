import mongoose from "mongoose";

const PharmacySchema = new mongoose.Schema({
  // Stores the URL/Path to the uploaded profile picture
  // In a real app, you would upload the file to storage (AWS S3, Cloudinary, etc.) 
  // and save the resulting URL here.
  profilePicture: {
    type: String,
    default: null 
  },
  pharmacyName: {
    type: String,
    required: [true, 'Pharmacy name is required'],
    trim: true,
    minlength: [2, 'Pharmacy name must be at least 2 characters long']
  },
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true, // Ensures no two pharmacies register with the same email
    lowercase: true,
    trim: true,
    // Basic regex validation for email format
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 
      'Please provide a valid email address'
    ]
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Pharmacy address is required'],
    trim: true
  },
  // GeoJSON Object for storing Longitude and Latitude
  // Useful for "find pharmacies near me" features
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      default: 'Point'
    },
    coordinates: {
      type: [Number], // Format: [longitude, latitude]
      required: false // Set to true if you want to force location selection
    }
  },
  openingHours: {
    type: String,
    required: [true, 'Opening hours are required'],
    trim: true
  }
}, {
  // Automatically manages 'createdAt' and 'updatedAt' fields
  timestamps: true
});

// Create and export the model
export default mongoose.model('Pharmacy', PharmacySchema);