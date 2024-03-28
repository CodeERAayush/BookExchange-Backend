import mongoose from "mongoose";
import Book from "../models/BookModel.js";
import Hostel from "../models/HostelModel.js";
import User from "../models/UserModel.js"

export const AddBook = async (req, res) => {
    const uid = req.user?.id
    const { name, image, description, price, quantity, writerName, condition, publicationYear, hostel_id } = req.body;
    try {
        const user = await User?.findOne({ _id: uid })
        const hostel = await Hostel?.findOne({ _id: hostel_id })
        // console.log(req.body)
        const newBook = new Book({
            ...req.body,
            user_id: uid,
            user: { name: user?.firstName + " " + user?.lastName, profileImage: user?.picturePath, address: user?.address },
            hostel_details: hostel
        })
        await newBook.save()
        return res.status(200)?.json({ success: true, data: newBook })
    } catch (error) {
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

