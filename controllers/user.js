import User from "../models/UserModel.js"

export const getUser=async (req,res)=>{
 const uid=req.user?.id 
    try {
        const user = await User?.findOne({_id:uid})
        if(!user) return res.status(401).json("No user found")
        else return res.status(200).json({success:true,data:user})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
export const getSpecificUser=async (req,res)=>{
 const uid=req.body?.user_id 
    try {
        const user = await User?.findOne({_id:uid})
        if(!user) return res.status(401).json("No user found")
        else return res.status(200).json({success:true,data:user})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

export const getAllUserHostelWise=async(req,res)=>{
    const  hostelId= req.body.hostel_id;
    try {
        const user=await User?.find({hostel:hostelId})
        return res.status(200).json({success:true,data:user})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}