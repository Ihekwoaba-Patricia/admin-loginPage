import mongoose from "mongoose";

//Create schema for Testimonials
const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    designationOrCompanyName: {
        type: String,
        required: true
    },
    profilePicture: {
        fileSize: String,
        s3Url: String,
        s3Key: String
    }
}, {
        timestamps: true
});

export const Testimonial = mongoose.model('Testimonial', TestimonialSchema);