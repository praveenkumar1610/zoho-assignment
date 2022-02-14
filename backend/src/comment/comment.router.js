import { Router } from "express";
import { createComment, getComments } from "./comment.controller.js";

const commentRouter=Router();

commentRouter.route('/').post(async(req,res)=>{
    try{
        const {comment,comment_by}=req.body;
        const result = await createComment({comment,comment_by})
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.send(500).send({message:'unexcepted error'})
    }
})


commentRouter.route('/').get(async(req,res)=>{
    try{
        const result =await getComments()
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).send({message:"unexcepted error"})
    }
})

export default commentRouter;