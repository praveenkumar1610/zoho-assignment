import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import userRouter from './src/auth/auth.router.js'
import commentRouter from './src/comment/comment.router.js';

const app=express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get("/",async (req,res)=>{
    return res.send("Hello World").sendStatus(200);
})

app.use('/api/user',userRouter);
app.use('/api/comment',commentRouter);


try{
    const PORT=4100;
    console.log("DATABASE URL",process.env.dburl);
    mongoose.connect(process.env.dburl)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`[server]:Server running at http://localhost:${PORT}`);
            console.log("DB Connection Successfully")
        })
    }).catch((error)=>{
        console.log(error);
        console.log("DB connection failed")
    })
}catch(err){
    console.log(err)
}