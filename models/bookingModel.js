import mongoose from 'mongoose';

// Define structure (schema) for a booking
const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    legalServiceNeeded: {
        type: String,
        required: true,
    },
    preferredDateAndTime: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    uploadedFile: [{
        fileName: String,
        fileType: String,
        fileSize: Number,
        s3Url: String,
        s3Key: String
    }]
}, {
    timestamps: true
});

// Create new book consultation model from schema
export const Booking = mongoose.model('Bookings', BookingSchema);
