import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Code Logic for Admin Login
export const adminLogin = async (req, res, next) => {
    try {
        const {username, password} = req.body

        //Confirm availability of inputs
        if(!username || !password) {
            return res.status(400).json({error: "Please input username and password"});
        }
        //Confirm email
        if(username !== process.env.ADMIN_USERNAME) {
            return res.status(401).json({error: "Unauthorized: Invalid Username."});
        }
        const isPassword = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
        if(!isPassword) {
            return res.status(401).json({error: "Unauthorized: Invalid Password."});
        }
        const token = jwt.sign({role: "admin"}, process.env.JWT_SECRET, {expiresIn: "45m"});
        console.log(`Admin login successfull`);
        
        return res.status(200).json({message: "Login successful", token})
    } catch (error) {
        console.error(`Error logging in: ${error}`);
        next(error);
    };
};