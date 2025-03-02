import amenitiesModel from "../models/amenities.model.js";
import lifeStyleModel from "../models/lifestyle.model.js";
import residenceModel from "../models/residence.model.js";

export  const postList = async (req, res) => {
  const {
    rent,
    buildingType,
    roomType,
    roomateGender,
    location,
    description,
    // images,
    cleanliness,
    foodPref,
    smoker,
    occupation,
    partyHabit,
    overnightGuest,
    parking,
    wifi,
    ac,
    tv,
    fridge,
    washingMachine,
  } = req.body;

  const newAmenity = await amenitiesModel.create({
    parking,
    wifi,
    ac,
    tv,
    fridge,
    washingMachine,
  });

  const lifeStyle = await lifeStyleModel.create({
    cleanliness,
    foodPref,
    smoker,
    occupation,
    partyHabit,
    overnightGuest,
  });

  const residence = await residenceModel.create({
    rent,
    buildingType,
    roomType,
    roomateGender,
    location,
    description,
    amenities: newAmenity._id,
    lifestyle: lifeStyle._id,
  });
  res.status(200).json({ message: "Post Created Successfully" });
  console.log("Residence created:", residence);
};
