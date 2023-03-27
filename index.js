const express= require("express")
const { connection } = require("./db")
require("dotenv").config()
const cors=require("cors")
const { UserRouter } = require("./routes/users.routes")
const {authentic}=require("./middleware/authentication.middleware")
const { postRouter } = require("./routes/posts.routes")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",UserRouter)
app.use(authentic)
app.use("/posts",postRouter)

app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`Running on port ${process.env.port}`)
    } catch (error) {
        console.log("Unable to connect to DB")
        console.log(error)
    }
})