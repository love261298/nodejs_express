import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.js";
dotenv.config();

const { SECRET_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(403).json({
                message: "ban chua dang nhap"
            })
        }
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decoded._id);
        if(!user) {
            return res.status(403).json({
                message: "Token loi"
            })
        }
        if(user.role !== 'admin') {
            return res.status(403).json({
                message: "Ban khong co quyen lam viec nay"
            })
        }
        next();
    } catch (error) {
        return res.json({
            name: error.name,
            message: error.message
        })
    }
}