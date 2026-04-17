require("dotenv").config()

const express = require("express")
const path = require("path")
const connectDB = require("./config/connect")
const app = express()

const PORT = 8000;

connectDB(process.env.MONGO_URL)

app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req,res)=>{
    res.render("home")
})

app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`))