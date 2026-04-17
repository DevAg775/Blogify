const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const User = require("../models/user")
const { createTokenForUser } = require("../services/authentication")



router.get("/signin", (req,res)=>{
    return res.render("signin")
})

router.get("/signup", (req,res)=>{
    return res.render("signup")
})

router.post("/signup",async (req,res)=>{
    try {
    const {fullname,email,password} = req.body;

    if(!fullname||!email||!password){
      return res.send("All fields are required")
    }

    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
      return res.send("User already exists with this email")
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newuser = await User.create({
        fullname,
        email,
        password: hashedPassword
    })

    return res.redirect("/signin")
    } catch (error) {
    console.log("Signup Error:", error.message)
    return res.status(500).send("Internal Server Error")
    }
})

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
  return res.render("signin", { error: "All fields are required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
  return res.render("signin", { error: "Email not Registered with us" })
    }  

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
  return res.render("signin", { error: "Invalid password" })
    }

    const token = createTokenForUser(user)

    res.cookie("token", token)

    return res.redirect("/")

  } catch (error) {
    return res.render("signin",{
      error: "Incorrect email or password"
    })
    
  }
})

router.get("/logout", (req,res)=>{
  res.clearCookie("token").redirect("/")
})

module.exports = router