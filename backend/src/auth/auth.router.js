import {Router} from 'express';
import {createUser,findUser,findPassword} from './auth.controller.js';

const userRouter= Router();

userRouter.route('/signup').post(async (req,res)=>{
    try{
        const { email, password,secret}=req.body;
        const result=await createUser({email,password,secret})
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).send({message:"invalid signup"})
    }
})


userRouter.route('/forgotPassword').post(async (req,res)=>{
    try{
        const {email,secret}=req.body;
        const result=await findPassword({email,secret})
        if(result !== null)
            res.status(200).json(result)
        else
            res.status(202).send({message:false})
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:false})
    }
})


userRouter.route('/login').post(async (req,res)=>{
    try{
        const {email,password}=req.body;
        const result=await findUser({email,password})
        if(result !== null)
            res.status(200).json(result)
        else
            res.status(202).send({message:false})
    }
    catch(err){
        console.log(err);
        res.status(500).send({message:false})
    }
})



export default userRouter;