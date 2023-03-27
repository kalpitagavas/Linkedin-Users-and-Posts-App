const express=require("express")
const {connection}=require("./config/db")
const {postRouter}=require("./routes.js/post.route")
require("dotenv").config()
const {userRouter}=require("./routes.js/user.routes")
const {authpost}=require("./middleware/authpost")
const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use("/posts",authpost,postRouter)
app.listen(process.env.port,async()=>{
 try{
      await connection
      console.log("connect to db")
 }
 catch(err){
     console.log("Check connection of db")
 }
    console.log(`server running at ${process.env.port}`)
})