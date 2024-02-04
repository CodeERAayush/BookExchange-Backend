import Review from "../models/ReviewModel.js";
import User from "../models/UserModel.js";

export const doReview=async(req,res)=>{
    const {book_id,review,stars}=req.body;
    const uid=req.user?.id 
    try {
        const user =await User?.findOne({_id:uid})
        const newReview= new Review({
            book_id:book_id,
            user_id:uid,
            reviewerName:user?.firstName+" "+user?.lastName,
            reviewerProfileImage:user?.picturePath,
            review:review,
            stars:stars
        })
        await newReview.save()
        return res.status(200)?.json({success:true,data:newReview})
     } catch (error) {
        return res.sendStatus(500)
     }
}


export const getReviews=async (req,res)=>
{
    const {book_id,lastReviewId}=req.body
    try {
        const reviewsForBookQuery = { book_id: book_id };

if (lastReviewId) {
    reviewsForBookQuery._id = { $gt: lastReviewId };
}

const reviewsForBook = await Review.find(reviewsForBookQuery)
    .sort({ _id: -1 })  // Descending order for ObjectID
    .limit(pageSize);
        // const booksWithId = await Review.find({ book_id: book_id })
        return res.status(200).json({ success: true, data: reviewsForBook });
    } catch (error) {
        return res.sendStatus(500)
    }
}