import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
        firstName: {
          type: String,
          required: true,
          min: 2,
          max: 50,
        },
        lastName: {
          type: String,
          required: true,
          min: 2,
          max: 50,
        },
        email: {
          type: String,
          required: true,
          max: 50,
          unique: true,
        },
        password: {
          type: String,
          required: true,
          min: 5,
        },
        picturePath: {
          type: String,
          default: "",
        },
        profileViews:{type: Number,default:0},
        address: {type:String,required:true},
        NotificationId: String,
        hostel:{
          type:String,
          required:true
        },
        totalSold:{type: Number,default:0}
},
{timestamps:true}
)

const User = mongoose.model("User", UserSchema);
export default User;