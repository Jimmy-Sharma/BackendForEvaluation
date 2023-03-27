const express=require('express')
const postRouter=express.Router()
const {PostModel}=require("../model/post.model")
const jwt=require('jsonwebtoken')

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token)

    try {
        if(decoded){
            const posts= await PostModel.find({"userID": decoded.userID})
            res.status(200).send(posts)
        }
    } catch (error) {
        res.status(400).send({
            "msg":error.message
        })
    }
})


postRouter.post("/add",async(req,res)=>{
    try {
        const post= new PostModel(req.body)
        await post.save()
        res.status(200).send({
            "msg":"A new Post has been added"
        })
    } catch (error) {
        res.status(400).send({
            "msg":error.message
        })
    }
})


module.exports={
    postRouter
}