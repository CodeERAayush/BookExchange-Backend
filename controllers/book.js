import Book from "../models/BookModel.js";
import Hostel from "../models/HostelModel.js";
import User from "../models/UserModel.js"

export const AddBook=async (req, res)=>{
 const uid=req.user?.id 
 const {name, image, description, price,quantity,writerName,condition,publicationYear,hostel_id} = req.body;
 try {
    const user =await User?.findOne({_id:uid})
    const hostel=await Hostel?.findOne({_id:hostel_id})
    // console.log(req.body)
    const newBook= new Book({
        ...req.body,
        user_id:uid,
        user:{name:user?.firstName+" "+user?.lastName,profileImage:user?.picturePath,address:user?.address},
        hostel_details:hostel
    })
    await newBook.save()
    return res.status(200)?.json({success:true,data:newBook})
 } catch (error) {
    return res.status(500)?.json({error:error?.message})
 }
}

export const getAllBooks=async (req,res)=>{
    try {
        const books= await Book.aggregate([
            { $sort: { createdAt: -1 } }
          ]);
        res.status(200).json({success:true,data:books})
    } catch (error) {
        res.send(404).json({success:false,error:error.message})
    }
}

export const getCatBooks=async (req,res)=>{
    const {category}=req.body
    try {
        console.log(category)
        const books= await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    category: category, 
                },
            },
          ]);
        res.status(200).json({success:true,data:books})
    } catch (error) {
        res.send(404).json({success:false,error:error.message})
    }
}

export const getHostelWiseBooks=async(req,res)=>{
    const {hostel_id}=req.body
    try {
        const books= await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {$match:{
                hostel_id : hostel_id,
            },}
          ]);
        res.status(200).json({success:true,data:books})
    } catch (error) {
        res.send(500).json({success:false,error:error.message})
    }
}
export const getHostelWiseBooksCategoryWise=async(req,res)=>{
    const {hostel_id,category}=req.body
    try {
        const books= await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {$match:{
                hostel_id : hostel_id,
                category: category, 
            }
        }
          ]);
        res.status(200).json({success:true,data:books})
    } catch (error) {
        res.send(500).json({success:false,error:error.message})
    }
}

