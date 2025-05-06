import User from "../models/user.model.js";
import Residence from "../models/residence.model.js";
import Amenity from "../models/amenities.model.js";
import LifeStyle from "../models/lifestyle.model.js";

export const deleteAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    await Residence.deleteMany({ postedBy: userId });

    const residences = await Residence.find({ postedBy: userId });

    // Step 2: Collect all Amenity and LifeStyle IDs
    const amenityIds = residences.map(r => r.amenities).filter(Boolean);
    const lifestyleIds = residences.map(r => r.lifestyle).filter(Boolean);

    // Step 3: Delete related Amenity and LifeStyle documents
    await Amenity.deleteMany({ _id: { $in: amenityIds } });
    await LifeStyle.deleteMany({ _id: { $in: lifestyleIds } });

    // Step 4: Delete all residences posted by user
    await Residence.deleteMany({ postedBy: userId });
    
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account and related listings deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting account", error: err.message });
  }
};
