import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema({
  rent: {
    type: Number,
    require: true,
  },
  buildingType: {
    type: String,
    require: true,
  },
  roomType: {
    type: String,
    require: true,
  },
  roomateGender: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: [
    {
      data: Buffer, // Binary data for the image
      contentType: String, // MIME type (e.g., "image/jpeg")
    },
  ],
  amenities: { type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }, 
  lifestyle: { type: mongoose.Schema.Types.ObjectId, ref: "Lifestyle" },
});
const Residence = mongoose.model("Residence", residenceSchema);

export default Residence;
