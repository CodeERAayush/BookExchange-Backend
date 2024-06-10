import mongoose from "mongoose";
import Book from "../models/BookModel.js";
import Hostel from "../models/HostelModel.js";

export const getAllHostels = async (req, res) => {
    const { searchQuery } = req.body;
    try {
        let allHostels;
        const matchStage = {};

        if (searchQuery) {
            matchStage.$or = [
                { hostelName: { $regex: searchQuery, $options: 'i' } }, 
                { address: { $regex: searchQuery, $options: 'i' } } 
            ];
        }

        const aggregationPipeline = [
            { $sort: { hostelName: 1 } }, 
            { $match: matchStage }
        ];

        allHostels = await Hostel.aggregate(aggregationPipeline);
        res.status(200).json({ success: true, data: allHostels });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


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