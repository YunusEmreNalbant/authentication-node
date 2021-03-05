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
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).json({"message": 'Böyle bir e-mail kayıtlı değil.'});

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).json({"message": 'Şifre hatalı'});

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);



}
