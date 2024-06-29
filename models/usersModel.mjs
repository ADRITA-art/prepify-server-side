import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
                       firstname: {
                        type: String,
                        required: true
                        },
                        lastname: {
                        type: String,
                        required: true
                         },
                        email:
                        {
                        type:String,
                        required:true,
                        unique:true
                        },
                        password: {
                        type: String,
                        required: true,
                        unique: true
                        },
                        phone: {
                        type: String,
                        required: true
                        },
                        aoi: {
                        type: [String], 
                        required: true,
                        validate: {
                        validator: function(arr) {
                        return arr.length >= 1 && arr.length <= 5; 
                        },
                        message: 'Maximum interest is 5.'
                        }
                        },
                        coins: {
                        type: Number,
                        required: true,
                        default: 0, 
                        min: [0, 'Coins cannot be negative']
                        }                        
                        });

const User = mongoose.model('User', userSchema, 'users');
export default User;