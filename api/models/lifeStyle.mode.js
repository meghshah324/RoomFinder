import mongoose from "mongoose";

const lifeStyleSchema = new mongoose.Schema({
  cleanliness: {
    type: String,
    require: true,
  },
  foodPref: {
    type: String,
    require: true,
  },
  smoker: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
  },
  partyHabit: {
    type: String,
    require: true,
  },
  overnightGuest: {
    type: String,
    require: true,
  },
});

const LifeStyle = mongoose.model("Lifestyle", lifeStyleSchema);

export default LifeStyle;
