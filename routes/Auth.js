import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { login } from "../controllers/auth.js";
const router=express.Router()
router.post('/login',login)
export default router;