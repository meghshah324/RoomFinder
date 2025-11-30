import Residence from "../models/residence.model.js";

export const filterRooms = async (req, res) => {
  try {
    const { location, minRent, maxRent, genderPreference, occupation } = req.body;

    const match = {};

    if (location) match["address.city"] = { $regex: location, $options: "i" };

    if (genderPreference && genderPreference !== "any") {
      match.genderLookingFor = { $regex: `^${genderPreference}$`, $options: "i" };
    }

    if (occupation) match.occupation = { $regex: occupation, $options: "i" };
    
    const pipeline = [
      { $match: match },
      {
        $addFields: {
          rentNumber: {
            $toDouble: { $replaceAll: { input: "$rent", find: ",", replacement: "" } }
          }
        }
      },
      {
        $match: {
          ...(minRent && { rentNumber: { $gte: Number(minRent) } }),
          ...(maxRent && { rentNumber: { $lte: Number(maxRent) } })
        }
      },
    ];

    const rooms = await Residence.aggregate(pipeline);

    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
