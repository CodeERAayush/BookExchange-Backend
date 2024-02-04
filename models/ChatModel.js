import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: String,
  },
  receiver: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: String,
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},
{timestamps:true});

const Message = mongoose.model('Message', messageSchema);

export default Message
