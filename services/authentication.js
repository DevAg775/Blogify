const JWT = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImage: user.profileImage,
        role: user.role
    }
    const token = JWT.sign(payload, secret, { expiresIn: "1d" })
    return token
}

function validateToken(token){
    const payload = JWT.verify(token, secret)
    return payload
}

module.exports = {
    createTokenForUser,validateToken
}