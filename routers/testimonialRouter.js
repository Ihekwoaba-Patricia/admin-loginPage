//Import multer to handle image files and express
import express from 'express';
import multer from 'multer';

//Import controller to handle requests
import { getAllTestimonial, postTestimonial } from '../controllers/testimonialController.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js';

const router = express.Router();
const storage = multer.memoryStorage(); // Returns a StorageEngine implementation configured to store files in memory as Buffer objects.

//Specify allowed file types
const allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
    storage : storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //5 MB
    fileFilter: (req, file, cb) => {
        if(allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

//Routes to controller
router.post('/',  verifyAdmin, upload.single('profilePicture'), postTestimonial);
router.get('/', getAllTestimonial)

export default router;

