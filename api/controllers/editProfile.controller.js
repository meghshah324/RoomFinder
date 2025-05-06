import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const editProfile = async (req, res) => {
  const { username, email } = req.body;
  const userId = req.params.userId;
  console.log("User ID:", userId);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      username,
      email,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
};

export const editPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect current password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password", error: err.message });
  }
};

