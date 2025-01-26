import User from "../model/User.js";
import  jwt  from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import {  signInValidator, signUpValidator } from "../validation/user.js";
import dotenv  from "dotenv";
dotenv.config()
const {SECRET_CODE} = process.env

export const signUp = async (req, res) => {
    try {
        const {error} = signUpValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const userExists = await User.findOne({email: req.body.email})
        if(userExists) {
            return res.status(400).json({
                message: "email nay da duoc dang ky",
            }) 
        }
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        const user = await User.create({
            ...req.body,
            password: hashedPassword
        })
        user.password = undefined;
        return res.status(200).json({
            message: 'Dang ky account thanh cong!',
            user
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}

export const signIn = async (req, res) => {
    try {
        const {error} = signInValidator.validate(req.body, {abortEarly: false});
        if(error) {
            const errors = error.details.map(err => err.message);
            return res.status(400).json({
                message: errors,
            })
        }
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(400).json({
                message: "email nay chưa được đăng ký",
            }) 
        }
        const isMatch = await bcryptjs.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message: "mat khau khong dung"
            })
        }
        const accessToken = jwt.sign({_id:user._id }, SECRET_CODE, {expiresIn: "1h"})
        user.password = undefined;
        return res.status(200).json({
            message: "Dang nhap thanh cong",
            user,
            accessToken
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        })
    }
}