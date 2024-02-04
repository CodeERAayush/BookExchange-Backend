import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  user_id: { type:String},
  book_id: { type:String},
  reviewerName: { type: String, required: true },
  reviewerProfileImage: String,
  review: { type: String, required: true },
  stars: { type: Number, required: true, min: 1, max: 5 },
},
{timestamps:true});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
