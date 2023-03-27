const jwt=require("jsonwebtoken")
require("dotenv").config()

const authentic=(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        const decoded=jwt.verify(token,process.env.secretCode)
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.status(400).send({"msg":"Wrong Credentials"})
        }
    }else{
        res.status(400).send({"msg":"Please login first"})
    }
}

module.exports={
    authentic
}