import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String }, // Assuming this is a URL to the profile image
  address: { type: String },
});

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Assuming this is a URL to the book image
  publicationYear: { type: Number },
  condition: { type: String },
  category: {
    type: String,
    enum: ['paper', 'book'],
    required: true
  },
  user: { type: userSchema, required: true },
  user_id: {
    type: String,
    required: true,
  },
  writerName: { type: String },
  description: { type: String },
  soldOut: { type: Boolean, default: false },
  quantity: { type: Number },
  price: { type: Number },
},
  { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
