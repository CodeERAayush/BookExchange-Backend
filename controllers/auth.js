import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/UserModel.js'

export const register = async (req, res) => {
  try {
    const { password, roomName } = req.body;
    const roomId = jwt.sign({ roomId: roomName }, process.env.JWT_SECRET);
    console.log("room_id ",roomId)
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({ ...req.body, password: passwordHash, roomId: roomId });
    const savedUser = await newUser.save();
    delete savedUser.password;
    res.status(201).json(savedUser);
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
    console.log("token:: ", token)
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}