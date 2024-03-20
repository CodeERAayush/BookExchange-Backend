import mongoose from "mongoose";

const HostelSchema=mongoose.Schema({
        hostelName: {
          type: String,
          required: true,
          min: 2,
          max: 50,
        },
        picturePath: {
          type: String,
          default: "",
        },
        address: {type:String,required:true}
},
{timestamps:true}
)

const Hostel = mongoose.model("Hostel", HostelSchema);
export default Hostel;