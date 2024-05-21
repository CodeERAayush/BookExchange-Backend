import mongoose from "mongoose";
import Book from "../models/BookModel.js";
import Hostel from "../models/HostelModel.js";
import User from "../models/UserModel.js"

export const AddBook = async (req, res) => {
    const uid = req.user?.id
    const { name, image, description, price, quantity, writerName, condition, publicationYear, hostel_id,picture } = req.body;
    console.log("kya aya : ",image,"   ",picture)
    try {
        const user = await User?.findOne({ _id: uid })
        const hostel = await Hostel?.findOne({ _id: hostel_id })
        // console.log(hostel)
        const newBook = new Book({
            ...req.body,
            user_id: uid,
            user: { name: user?.firstName + " " + user?.lastName, profileImage: user?.picturePath, address: user?.address,phone:user?.phone },
            hostel_details: JSON.stringify(hostel)
        })
        await newBook.save()
        return res.status(200)?.json({ success: true, data: newBook })
    } catch (error) {
        console.log(error)
        return res.status(500)?.json({ error: error?.message })
    }
}

export const getAllBooks = async (req, res) => {
    try {
        let books;
        if (req.body.lastBookId) {
            books = await Book.aggregate([
                { $sort: { createdAt: -1 } },
                { $match: { _id: { $lt: new mongoose.Types.ObjectId(req.body.lastBookId) } } },
                { $limit: 15 }
            ]);
        }
        else {
            books = await Book.aggregate([
                { $sort: { createdAt: -1 } },
                { $limit: 15 }
            ])
        }
        res.status(200).json({ success: true, data: books })
    } catch (error) {
        res.status(404).json({ success: false, error: error.message })
    }
}

export const getMyBooks=async(req,res)=>{
    try {
        const {id}=req.user;
        let books;
        let numBooks=await Book.find({user_id:id});
        if (req.body.lastBookId) {
            books = await Book.aggregate([
                { $sort: { createdAt: -1 } },
                { $match: {user_id:id , _id: { $lt: new mongoose.Types.ObjectId(req.body.lastBookId) }}},
                { $limit: 15 }
            ]);
        }
        else {
            books = await Book.aggregate([
                { $sort: { createdAt: -1 } },
                { $match: { user_id:id }},
                { $limit: 15 }
            ])
        }
        res.status(200).json({ success: true, data: books, numberofBooks:numBooks?.length })
    } catch (error) {
        res.status(400).json({success:false,message:error})
    }
}

export const deleteBook=async(req,res)=>{
    try {
        const {bookId}=req.body;
        const book=await Book.findById(bookId);
        if(!book){
            return res.status(400).json({success:false,message:"Book not found"})
        }
        else {
            await Book.findByIdAndDelete(bookId);
            return res.status(200).json({success:true,message:"Book deleted",data:book})
        }
    } catch (error) {
        res.status(400).json({success:false,message:error})
    }
}

export const getBookDetails=async (req,res)=>{
    try {
        const {id}=req.params
        console.log(id)
        let bookData=await Book.findOne({_id:new mongoose.Types.ObjectId(id)})
        let hostelData=await Hostel.findOne({_id:new mongoose.Types.ObjectId(bookData?.hostel_id)})
        res.status(200).json({success:true,data:bookData,hostelData:hostelData})
    } catch (error) {
    res.status(404).json({ success: false, error: error.message })
}
}

export const getCatBooks = async (req, res) => {
    const { category,lastBookId } = req.body
    try {
        console.log(category)
        let books;
        if(lastBookId)
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    category: category,
                    _id: { $lt: new mongoose.Types.ObjectId(lastBookId) }
                },
            },
            {$limit:10}
        ]);
        else
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    category: category,
                    
                },
            },
            {$limit:10}
        ]);
        res.status(200).json({ success: true, data: books })
    } catch (error) {
        res.send(404).json({ success: false, error: error.message })
    }
}

export const getHostelWiseBooks = async (req, res) => {
    const { hostel_id,lastBookId } = req.body
    try {
        let books;
        if(lastBookId)
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    hostel_id: hostel_id,
                    _id: { $lt: new mongoose.Types.ObjectId(lastBookId) }
                },
            },
            {$limit:10}
        ]);
        else
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    hostel_id: hostel_id,
                },
            },
            {$limit:10}
        ]);
        res.status(200).json({ success: true, data: books })
    } catch (error) {
        res.send(500).json({ success: false, error: error.message })
    }
}
export const getHostelWiseNewBooks = async (req, res) => {
    const { hostel_id } = req.body
    try {
        let books;
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    hostel_id: hostel_id,
                },
            },
            {$limit:5}
        ]);
        res.status(200).json({ success: true, data: books })
    } catch (error) {
        res.send(500).json({ success: false, error: error.message })
    }
}
export const getHostelWiseBooksCategoryWise = async (req, res) => {
    const { hostel_id, category,lastBookId } = req.body
    try {
        let books; 
        if(lastBookId)
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    hostel_id: hostel_id,
                    category: category,
                    _id: { $lt: new mongoose.Types.ObjectId(lastBookId) }
                }
            },
            {$limit:10}
        ]);
        else
        books = await Book.aggregate([
            { $sort: { createdAt: -1 } },
            {
                $match: {
                    hostel_id: hostel_id,
                    category: category,
                }
            },
            {$limit:10}
        ]);
        res.status(200).json({ success: true, data: books })
    } catch (error) {
        res.send(500).json({ success: false, error: error.message })
    }
}

