import validator from 'validator'; // To validate 
import { ContactUs } from '../models/contactUsModel.js';
import { sendContactUsEmail } from '../utils/emailSender.js';

//* Code Logic to submit contact us form
export const contactUs = async (req, res, next) => {
    try {
        // Deconstruct necessary fields from req.body
    const {fullName, email, message} = req.body;
    // Validate input
    if (!fullName || !email || !message){
        return res.status(400).json({error: "Please fill in all required fields."});
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error: "Please input a valid Email address."});
    }
    // Create new contact us form based off ContactUs Model
    const newContactUs = new ContactUs({
        fullName, email, message
    });
    // Save newly created form to DB
    await newContactUs.save();

    // Send Email notification to admin
    await sendContactUsEmail(newContactUs);

    //Response message upon successful contact
    return res.status(201).json({message: "Thank you for reaching out! Your message has been received and we will get back to you soon."});
    } catch (error) {
        console.error('Error', error);
        next(error);
    }
}

//* Code Logic to get all contact us forms
export const getAllContactUs = async (req, res, next) => {
    try {
        const allContactUsForm = await ContactUs.find().sort({createdAt: -1});
        return res.status(200).json(allContactUsForm);
    } catch (error) {
        console.error('Error', error);
        next(error);
    }
}