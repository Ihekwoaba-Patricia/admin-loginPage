import express from 'express';

//Import controller function
import { contactUs, getAllContactUs } from '../controllers/contactUsController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';

// Instantiate router method in express
const router = express.Router();

// Route to controller
router.post('/', contactUs);
router.get('/', verifyAdmin, getAllContactUs);

export default router;
