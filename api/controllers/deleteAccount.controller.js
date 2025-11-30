import User from "../models/user.model.js";
import Residence from "../models/residence.model.js";
import Amenity from "../models/amenities.model.js";
import LifeStyle from "../models/lifestyle.model.js";

export const deleteAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    const residences = await Residence.find({ postedBy: userId })
      .select("amenities lifestyle")
      .lean();

    const amenityIds = residences.flatMap(r => r.amenities || []);
    const lifestyleIds = residences.flatMap(r => r.lifestyle || []);

    await Promise.all([
      Amenity.deleteMany({ _id: { $in: amenityIds } }),
      LifeStyle.deleteMany({ _id: { $in: lifestyleIds } }),
      Residence.deleteMany({ postedBy: userId }),
    ]);

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Account and all related data deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: "Error deleting account",
      error: err.message,
    });
  }
};
