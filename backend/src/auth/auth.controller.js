import {User} from './auth.model.js';

export const createUser=(async data=>{
    const {email,password,secret}=data;
    const document=await User.create({email,password,secret});
    return document
})

export const findUser=(async data =>{
    const {email,password} = data;
    const document=await User.findOne({email:email,password:password})
    console.log(document)
    return document
})

export const findPassword=(async data=>{
    const {email,secret} =data;
    const document=await User.findOne({email:email,secret:secret})
    console.log(document)
    return document
})