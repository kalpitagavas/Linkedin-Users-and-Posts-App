const jwt=require("jsonwebtoken")
const authpost=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    try{
        if(token){
            const decoded=jwt.verify(token,'ball')
        if(decoded)
        {
            req.body.userID=decoded.userID
            next()
        }
        else{
            res.status(400).send({"msg":" login first"})
        }

        }
    }
    catch(err)
    {
        res.status(400).send({"msg":"login first"})
    }
}

module.exports={authpost}