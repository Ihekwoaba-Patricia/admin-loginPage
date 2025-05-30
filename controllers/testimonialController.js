//* Import Testimonial Model
import { Testimonial } from "../models/testimonialModel.js";
//* Import util to upload files to S3
import { uploadFileToS3 } from "../utils/s3Uploader.js";

//* Code Logic for posting Testimonials
export const postTestimonial = async (req, res, next) => {
    try {
        const {name, message, designationOrCompanyName} = req.body;
    
    //* Validate input fields
    if(!name || !message || !designationOrCompanyName) {
        return res.status(400).json({error: "Please fill all required fields."});
    };

    //* Handle file for profile picture
    // Get profile picture from request
    const profilePicture = req.file;
    // Process picture data
    let profilePictureInfo = {};
    if(profilePicture){
        const result = await uploadFileToS3(profilePicture);
        profilePictureInfo = {
        fileSize: profilePicture.size,
        fileType: profilePicture.mimetype,
        s3Url: result.location,
        s3Key: result.key
        };
    };

    //* Create new testimonial based off Testimonial Model
    const newTestimonial = new Testimonial({
        name,
        message,
        designationOrCompanyName,
        profilePicture: profilePictureInfo
    });
    console.log("New Testimonial", newTestimonial);
    //* Save newly created testimonial
    await newTestimonial.save();
    //* Send response
    return res.status(201).json({message: "Testimonial posted successful.", testimonial: newTestimonial});
    } catch (error) {
        next(error);
    }
}

//* Code Logic to get Testimonials
export const getAllTestimonial = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt : -1});
        return res.status(200).json(testimonials)
    } catch (error) {
        console.error(error);
        next(error)
    }
}