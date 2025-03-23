import mongoose from "mongoose";

const lifeStyleSchema = new mongoose.Schema({
  cleanliness: {
    type: String,
    required: true,
  },
  foodPreference: {
    type: String,
    required: true,
  },
  smoker: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  partyHabit: {
    type: String,
    required: true,
  },
  overnightGuest: {
    type: String,
    required: true,
  },
});

const LifeStyle = mongoose.model("LifeStyle", lifeStyleSchema);

export default LifeStyle;
