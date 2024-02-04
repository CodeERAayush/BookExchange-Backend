import Book from "../models/BookModel.js";
import User from "../models/UserModel.js"

export const AddBook=async (req, res)=>{
 const uid=req.user?.id 
 const {name, image, description, price,quantity,writerName,condition,publicationYear} = req.body;
 try {
    const user =await User?.findOne({_id:uid})
    // console.log(req.body)
    const newBook= new Book({
        ...req.body,
        user_id:uid,
        user:{name:user?.firstName+" "+user?.lastName,profileImage:user?.picturePath,address:user?.address}
    })
    await newBook.save()
    return res.status(200)?.json({success:true,data:newBook})
 } catch (error) {
    return res.sendStatus(500)
 }
}

export const getAllBooks=async (req,res)=>{
    try {
        const books= await Book.aggregate([
            { $sort: { createdAt: -1 } } // Sort by createdAt in descending order
          ]);
        res.status(200).json({success:true,data:books})
    } catch (error) {
        res.send(404).json({success:false,error:error.message})
    }
}