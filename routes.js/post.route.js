const express=require("express")
const postRouter=express.Router()
const {postModel}=require("../models/post.model")
const jwt=require('jsonwebtoken')
postRouter.post("/add",async(req,res)=>{
  try{
    const post=new postModel(req.body)
    await post.save()
    res.status(200).send({"msg":"New post added successfully"})
  }
  catch(err){
    res.status(400).send({"msg":err.message})
  }
})
postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"ball")
 try{
    if(decoded){
    const post=await postModel.find()
    console.log(post)
    res.status(200).send({"msg":'All post'})
    }else{
        res.status(400).send({"msg":err.message})
    }
 }
 catch(err){
        res.status(400).send({"msg":err.message})
 }
})

postRouter.get("/top",async(req,res)=>{
  try{
    const page=req.params.no
    const datapages=(page-1)*2
 const post=await postModel.find().skip(datapages).limit(3)
res.status(200).send(post)
}
catch(err){
    res.status(400).send({"msg":"not found"})
}
})

postRouter.patch("/update/:id",async(req,res)=>{
q
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
  
     try{
         const post= postModel.findByIdAndDelete({_id:id})
         await post.save()
         res.status(200).send({"msg":"deleted"})
     }
     catch(err){
       res.status(400).send({"msg":"wrong id"})
     }
})

module.exports={postRouter}