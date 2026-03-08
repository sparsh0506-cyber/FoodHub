// import mongoose from "mongoose";
import Usermodel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


// login user
const longinUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "user not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error" });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email address" });
        }
        const exist = await Usermodel.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "user already exist" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "provide A strong password" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Usermodel({
            name: name,
            email: email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "error" });
    }
}
export { longinUser, registerUser };