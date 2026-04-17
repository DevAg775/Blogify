require("dotenv").config()

const express = require("express")
const path = require("path")
const connectDB = require("./config/connect")
const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const cookieParser = require("cookie-parser")
const { checkForAuthCookie } = require("./middleware/authentication")
const Blog = require("./models/blog")

const PORT = 8000;

connectDB(process.env.MONGO_URL)

app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthCookie("token"))
app.use(express.static(path.resolve("./public")))

app.use("/",userRoute)
app.use("/blog",blogRoute)

app.get("/",async (req,res)=>{
    const allblog = await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allblog
    })
})

app.listen(PORT, ()=> console.log(`Server started at PORT:${PORT}`))