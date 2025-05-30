import mongoose from 'mongoose';

//* Create Contact Us Schema
const ContactUsSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const ContactUs = mongoose.model('Contact-Us', ContactUsSchema);