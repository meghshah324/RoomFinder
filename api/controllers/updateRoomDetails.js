import Residence from "../models/residence.model.js";

export const updateListing = async (req, res) => {
  const postid = req.params.id;
  const listing = await Residence.findById(postid);
  if (!listing) {
    res.status(404).json({ error: "Listing Not Found" });
  }
  console.log(listing);
  try {
    const updatedListing = await Residence.findByIdAndUpdate(postid, req.body, {
        new: true,
        runValidators: true,
      });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
  }
};
