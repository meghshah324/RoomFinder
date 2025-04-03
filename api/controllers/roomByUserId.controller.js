import Residence from "../models/residence.model.js";

export const getRoomByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const rooms = await Residence.find({ postedBy: userId })
      .populate("amenities lifestyle")
      .populate("postedBy", "username email");

    if (!rooms.length) {
      return res.status(404).json({ message: "No rooms found for this user." });
    }

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


