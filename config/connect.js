const mongoose = require("mongoose")

async function connectDB(url) {
  try {
    await mongoose.connect(url)
    console.log("MongoDB Connected")
  } catch (err) {
    console.log("Mongo Error:", err.message)
    process.exit(1)
  }
}

module.exports = connectDB