import { Comment } from "./comment.model.js";

export const createComment=async(data)=>{
    try{
        const {comment,comment_by}=data;
        const docs=await Comment.create({comment,comment_by});
        // const savecomment=await Comment.findOne(docs._id).populate('comment_by').exec((err,user)=>{
        //     if (err) return err;
        //     return user
        // })
        const savecomment=await Comment.find(docs_id).populate('comment_by',["email"])
        console.log("docs",savecomment)
        return docs
    }catch(err){
        console.log(err);
    }    
}



export const getComments=async()=>{
    try{
        const docs=await Comment.find().populate('comment_by',["email"])
        console.log("docs",docs)
        return docs
    }catch(err){
        console.log(err);
    }    
}