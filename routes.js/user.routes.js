const express=require("express")
const userRouter=express.Router()
const {userModel}=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

//registration
userRouter.post("/register",async(req,res)=>{
   const {email,name,gender,password,age,city,id_married}=req.body
   try{
      bcrypt.hash(password,3,async(err,hash)=>{
         const user=new userModel({email,name,gender,password:hash,age,city,id_married})
         await user.save()
         res.status(200).send({"msg":"Registration done!"})
     
      })
   }
   catch(err){
      res.status(400).send({"msg":err.message})
   }
})

//login
userRouter.post("/login",async(req,res)=>{
   const {email,password}=req.body
   try{
         const user=await userModel.find({email})
         if(user){
            bcrypt.compare(password,user[0].password,(err,result)=>{
               if(result)
               {
                  res.status(200).send({"msg":"Login Successfull","token":jwt.sign({"userID":user[0].id},"ball")})
               }
               else{
                  res.status(400).send({"msg":"Wrong details"})
               }
            })
         }
   }
   catch(err){
        res.status(400).send({"msg":err.message})
   }
})
module.exports={userRouter}
