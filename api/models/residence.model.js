import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema({
  rent: { type: Number, required: true },
  buildingType: { type: String, required: true },
  roomType: { type: String, required: true },
  roommateGender: { type: String, enum: ["Male", "Female", "Any"] },
  location: { type: String, required: true },
  description: { type: String, required: true },
  // images: [
  //   {
  //     data: Buffer,
  //     contentType: String,
  //   },
  // ],
  amenities: { type: mongoose.Schema.Types.ObjectId, ref: "Amenity" },
  lifestyle: { type: mongoose.Schema.Types.ObjectId, ref: "LifeStyle" },
});

const Residence = mongoose.model("Residence", residenceSchema);

export default Residence;
