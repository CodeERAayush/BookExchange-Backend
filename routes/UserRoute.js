import express from "express";
import { getAllUserHostelWise, getSpecificUser, getUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router=express.Router()

router.get('/user',getUser)
router.post('/users_hostelwise',getAllUserHostelWise)
router.post('/specific_user',getSpecificUser)

export default router