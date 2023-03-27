const mongoose = require("mongoose")

const linkedinSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean
}, {
    versionKey: false
})

const LinkedinModel = new mongoose.model("user", linkedinSchema)
module.exports = {
    LinkedinModel
}