import Residence from "../models/residence.model.js";
import Amenity from "../models/amenities.model.js";
import Lifestyle from "../models/lifestyle.model.js";
import { v2 as cloudinary } from "cloudinary";

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Residence.findById(postId)
      .select("amenities lifestyle photos")
      .lean();

    if (!post) {
      return res.status(404).json({ error: "Post Not Found" });
    }

    const deleteRelated = [];
    if (post.amenities) deleteRelated.push(Amenity.findByIdAndDelete(post.amenities));
    if (post.lifestyle) deleteRelated.push(Lifestyle.findByIdAndDelete(post.lifestyle));

    if (post.photos?.length > 0) {
      const cloudDeletes = post.photos.map(photo => cloudinary.uploader.destroy(photo.public_id));
      deleteRelated.push(...cloudDeletes);
    }

    await Promise.all(deleteRelated);

    const deletedPost = await Residence.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Listing Not Found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
