const {Router} = require("express")
const UserRouter = Router()
const { LinkedinModel } = require("../model/linkedin.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require("dotenv").config()


//User Registration
UserRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new LinkedinModel({ name, email, gender, password: hash, age, city, is_married })
            await user.save()
            res.status(200).send({
                "msg": "Registration has been done succefully."
            })
        })
    } catch (error) {
        res.status(400).send({
            "msg": err.message
        })
    }
})

//User login
UserRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await LinkedinModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({
                        "msg": "Logged in Successfully", "token": jwt.sign({ "userID": user._id },process.env.secretCode)
                    })
                } else {
                    res.status(400).send({
                        "msg": "Wrong Credentials"
                    })
                }
            })
        }
    } catch (err) {
        res.status(400).send({
            "msg": err.message
        })
    }
})

module.exports = {
    UserRouter
}