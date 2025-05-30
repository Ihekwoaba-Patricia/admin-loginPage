// Import validoator package to check email
import validator from 'validator';
//Import necessary Modules 
import { Booking } from '../models/bookingModel.js';
import { uploadFileToS3 } from '../utils/s3Uploader.js';
import { sendBookingEmail } from '../utils/emailSender.js';

// Code Logic to Book Consultation
export const bookConsultation = async (req, res, next) => {
    try {
        // Ensure req.body exists before destructuring
        if (!req.body) {
            return res.status(400).json({ error: "No form data received. Please submit all required fields." });
        }
        //Destructure required input from req.body
        const {
        name, 
        email, 
        mobileNo, 
        legalServiceNeeded, 
        preferredDateAndTime, 
        comment
    } = req.body

    //Confirm availability of inputs
    if(!name || !email || !mobileNo || !legalServiceNeeded || !preferredDateAndTime ) {
        return res.status(400).json({error: "Please fill all required fields."})
    };

    //Validate Email Address
    if(!validator.isEmail(email)) {
        return res.status(400).json({ error: "Please insert a valid Email address."})
    };

    // Handle document attachment
    //? Comment out mandatory file upload requirements
    /* const file = req.files;
     if (!file) {
         return res.status(400).json({message: "No document attached."})
     } */

    //? Comment out logic for file meta data with only multer
    /* const uploadedFile = file.map((file) => ({
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        fileBuffer: file.buffer
    })); 

    uploadedFile.forEach((doc, index) => {
        console.log(`File ${index + 1}:`);
        console.log(`- Name: ${doc.fileName}`);
        console.log(`- Type: ${doc.fileType}`);
        console.log(`- Size: ${doc.fileSize} bytes`);
    });*/

    //Handling files with AWS S3
    const uploadedFiles = [];

    for (const file of req.files || []) {
        const result = await uploadFileToS3(file); 
        uploadedFiles.push({
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
            s3Url: result.location,
            s3Key: result.key,
        });
        // Log file details to console
        //console.log(`Uploaded file: ${file.originalname}, type: ${file.mimetype}, size: ${file.size}`);
    }   

    // Create and save new booking to DB
    const newBooking = new Booking({
        name,
        email,
        mobileNo,
        legalServiceNeeded,
        preferredDateAndTime,
        comment,
        uploadedFile: uploadedFiles
    });

    console.log('Booking instance:', newBooking);


    await newBooking.save();

    //Send booking notification to admin
    await sendBookingEmail(newBooking);

    //Response for successfull booking
    return res.status(201).json({message: "Consultation booked successfully."});
    } catch (error) {
        console.log("Error booking consultation:", error);
        next(error);
    };
}

// Code Logic to get all bookings
export const getAllBooking = async (req, res, next) => {
    try {
        // const limit = parseInt(req.query.limit) || 1;
        // const page = parseInt(req.query.page) || 20;
        // const skip = (page - 1) * limit;
        const bookings = await Booking.find().sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit); // get all bookings
        res.status(200).json(bookings);
    } catch (error) {
        console.error(`Error retrieving bookings`);
        next(error);
    }
};

// Code Logic to search for bookings
export const searchBookings = async (req, res, next) => {
    const term = req.query.term;
    // const limit = parseInt(req.query.limit) || 1;
    // const page = parseInt(req.query.page) || 20;
    // const skip = (page - 1) * limit;
    // Check if a term(name or email) is given
    if(!term) {
        res.status(400).json({message: "Please input name or email to search for."})
    };

    try {
        const result = await Booking.find({
            $or: [
            {name: {$regex: term, $options: "i"}},
            {email: {$regex: term, $options:"i"}}
            ]
        }).sort({ createdAt: -1 })
        // .skip(skip)
        // .limit(limit);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    };
};

// Code Logic for dashboard analytics
export const getBookingsAnalytics = async (req, res, next) => {
    try {
        //* Retrieve bookings from mongoDB first, then return length
        /*const bookings = await Booking.find().sort({ createdAt: -1})
        const totalBookings = bookings.length;*/
        //* Use mongoDB countDocuments() method
        const totalBookings = await Booking.countDocuments();
        return res.status(200).json({totalBookings});
    } catch (error) {
        next(error);
    };
};