import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.mjs';
/*import geminiService from '../services/geminiServices.mjs';*/
import { AxiosError } from 'axios';

const register = async (req, res) => {
    const {
firstname,
lastname,
email,
password ,
phone,
aoi
} = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            phone,
            aoi,
            coins: 0
        });

        await newUser.save();

 /*       for(var i=0;i<aoi.length;i++){
            await geminiService(aoi[i]);
            console.log("done");
            }
            console.log("sad");*/


        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            
            return res.status(404).json({ message: 'Go to register' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ email: user.email },"secret");
        res.json({ message: 'Login successful'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export default { register, login };
