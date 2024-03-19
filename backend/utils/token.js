import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const newtoken = (userId, res) => {

    const secretKey = process.env.JWT_SECRET || 'fallback_secret_key';
    
    const token = jwt.sign({userId}, secretKey, {
        expiresIn: '30d'
    })

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //ms
        httpOnly: true, //prevent XSS attacks cross-cite scripting attacks
        sameSite: "strict"
    })
}

export default newtoken;