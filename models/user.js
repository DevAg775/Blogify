const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
 fullname: {
    type: String,
    required: true,
    trim: true,
 },
 email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
 },
 password: {
    type: String,
    required: true,
 },
 profileImage: {
    type: String,
    default: '/images/default.png',
 },
 Role: {
    type: String,
    enum: ["USER","ADMIN"],
    default: "USER"
 }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)