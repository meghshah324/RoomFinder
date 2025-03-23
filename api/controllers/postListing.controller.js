import amenitiesModel from "../models/amenities.model.js";
import lifeStyleModel from "../models/lifestyle.model.js";
import residenceModel from "../models/residence.model.js";

export const postList = async (req, res) => {
  try {
    const {
      rent,
      buildingType,
      roomType,
      location,
      genderLookingFor,
      description,
      cleanliness,
      foodPreference,
      smoker,
      occupation,
      partyHabit,
      overnightGuest,
      amenities 
    } = req.body;

    const amenityObject = {
      parking: amenities.includes("parking"),
      wifi: amenities.includes("wifi"),
      ac: amenities.includes("ac"),
      tv: amenities.includes("tv"),
      fridge: amenities.includes("fridge"),
      washingMachine: amenities.includes("washingMachine")
    };

  
    const newAmenity = await amenitiesModel.create(amenityObject);

    const lifeStyle = await lifeStyleModel.create({
      cleanliness,
      foodPreference,
      smoker,
      occupation,
      partyHabit,
      overnightGuest
    });

    const residence = await residenceModel.create({
      rent,
      buildingType,
      roomType,
      location,
      genderLookingFor,
      description,
      occupation,
      postedBy: req.user.userId,
      amenities: newAmenity._id,
      lifestyle: lifeStyle._id
    });
    res.status(200).json({ message: "Post Created Successfully" });
    console.log("Residence created:", residence);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
};
