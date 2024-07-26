const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (userId, isAdmin, res) => {
    const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true,
        sameSize: "strict"
    })

    return token
}

module.exports = { generateTokenAndSetCookie };
