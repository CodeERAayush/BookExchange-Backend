import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/UserModel.js'
import Hostel from "../models/HostelModel.js";
import { sendEmail } from "../helper/helper.js";

export const registerHostel = async (req, res) => {
  try {
    const newHostel = new Hostel({ ...req.body });
    const savedHostel = await newHostel.save();
    res.status(201).json(savedHostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const register = async (req, res) => {
  try {
    const { password,email } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ ...req.body, password: passwordHash });
    const savedUser = await newUser.save();
    // delete savedUser.password;
    
    // let emailType="VERIFY"

    // const mailResponse=await sendEmail({email,emailType,userId:savedUser?._id})
    res.status(201).json({success:true,data:savedUser});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).send('Incorrect form submission');
    //checking the user in the database
    const user = await User.findOne({ email: email })
    console.log(email, user)
    if (!user) return res.status(400).send('Incorrect Email')
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // console.log("token:: ", token)
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export const sendVerificationMail=async(req,res)=>{
  
}