import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import newtoken from "../utils/token.js";

export const signup = async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body

        if (password !== confirmPassword) {
            return res.status(400).json({error: "Passwords do not match"})
        }

        const user = await User.findOne({username}) // check if username exists in db
        if (user) {
            return res.status(400).json({error: "Username already exists"})
        }

        // hash paaword
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //pfp generating api
        const randompfp = `https://avatar.iran.liara.run/username?username=${username}&length=1`

        const newuser = new User({
            email,
            username,
            password: hashedPassword,
            profilepic: randompfp,
        })
    
        if (newuser) {
            newtoken(newuser._id, res);
            await newuser.save();

        res.status(201).json({
            _id: newuser._id,
            email: newuser.email,
            username: newuser.username,
        }) // successful sign up

        } else {
            res.status(400).json({error: "Invalid user data"})
        }
    } catch(err) {
        res.status(500).json({error: "Internal server error"})
        console.log(err.message)
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials"})
        }
        newtoken(user._id, res)

        res.status(200).json({
            _id: user._id,
            email: user.email,
            username: user.username,
        })

    } catch(err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    } catch(err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"})
    }
}
