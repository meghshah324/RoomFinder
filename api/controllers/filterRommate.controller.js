import Residence from "../models/residence.model.js";

export const findRooms = async (req, res) => {
    try {
      const { location, minRent, maxRent, genderPreference } = req.body;
  
      const filters = {};
      if (location) filters.location = location;
      if (genderPreference) filters.roommateGender = genderPreference;
      if (minRent) filters.rent = { $gte: Number(minRent) };
      if (maxRent) filters.rent = { ...filters.rent, $lte: Number(maxRent) };
  
      console.log("Filters:", filters); 
  
      const rooms = await Residence.find(filters).populate("amenities lifestyle");
      console.log("Matching Rooms:", rooms); 
  
      res.json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  