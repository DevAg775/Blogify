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
 profileImageURL: {
    type: String,
    default: '/images/default.png',
 },
 role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
 }
},{timestamps: true})

module.exports = mongoose.model("User", userSchema)