import Residence from "../models/residence.model.js";

export const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.id;
        
        const room = await Residence.findById(roomId)
            .populate("amenities lifestyle")
            .populate("postedBy", "username email");

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
