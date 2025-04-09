import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Conversation", conversionSchema);
