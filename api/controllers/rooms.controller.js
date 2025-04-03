import Residence from "../models/residence.model.js"

export const rooms = async (req, res) => {
   try {
      const listing = await Residence.find()
         .populate("amenities")
         .populate("lifestyle")
         .populate("postedBy", "username email");
      res.status(200).json(listing);
   } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({ error: error.message });
   }
}
