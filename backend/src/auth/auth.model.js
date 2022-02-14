import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        secret:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);

export const User=mongoose.model('User',userSchema);