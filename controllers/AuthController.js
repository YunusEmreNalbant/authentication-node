import User from "../models/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const register = async (req, res) => {


    const userExist = await User.findOne({email: req.body.email})
    if (userExist) return res.status(400).json({"message": 'Böyle bir kullanıcı zaten kayıtlı'});


    //Hash password
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try {
        await newUser.save();
        res.status(200).json(newUser)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    jwt.sign({user: req.body}, 'secretkey', (err, token) => {
        res.json({
            token: token,
        })
    });
}
