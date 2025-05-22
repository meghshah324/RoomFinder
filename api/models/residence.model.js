import mongoose from "mongoose";

const residenceSchema = new mongoose.Schema({
  rent: { type: String, required: true },
  buildingType: { type: String, required: true },
  roomType: { type: String, required: true },
  genderLookingFor: { type: String, enum: ["Male", "Female", "Any","female","male"] },
  address : {
    street: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  description: { type: String, required: true },
  occupation: { type: String, required: true },
  photos: [
    {
      public_id: String,
      url: String,
    },
  ],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amenities: { type: mongoose.Schema.Types.ObjectId, ref: "Amenity" },
  lifestyle: { type: mongoose.Schema.Types.ObjectId, ref: "LifeStyle" },
});

const Residence = mongoose.model("Residence", residenceSchema);

export default Residence;
