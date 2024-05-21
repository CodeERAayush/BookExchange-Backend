import mongoose from "mongoose";
import Book from "../models/BookModel.js";
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

export const getHostelsWithDetails=async(req,res)=>{
    try {
        let Hostels;
        let numHostels=await Hostel.find();
        if (req.body.lastHostelId) {
            Hostels = await Hostel.aggregate([
                { $sort: { createdAt: -1 } },
                { $match: {_id: { $lt: new mongoose.Types.ObjectId(req.body.lastHostelId) }}},
                { $limit: 15 }
            ]);
        }
        else {
            Hostels = await Hostel.aggregate([
                { $sort: { createdAt: -1 } },
                { $limit: 15 }
            ])
        }
        res.status(200).json({ success: true, data: Hostels, numberofHostels:numHostels?.length })
    } catch (error) {
    res.status(500).json({message: error?.message})
    }
}