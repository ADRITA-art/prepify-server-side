import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usersModel.mjs';
import mongoose from 'mongoose';
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

        const token = jwt.sign({ email: user.email ,id:user.id },"secret");

        res.status(201).json({
            succes: true,
            statusCode:201,
            token: token
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const userById = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
      }
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
export default { register, login ,userById};
