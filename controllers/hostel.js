import Hostel from "../models/HostelModel.js";

export const getAllHostels=async(req,res)=>{
try {
    const allHostel=await Hostel.aggregate([
        {$sort:{hostelName:1}},
    ]);
    res?.status(200)?.json({success:true,data:allHostel});
} catch (error) {
    res.status(500).json({message: error})
}
}