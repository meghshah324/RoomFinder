import Residence from "../models/residence.model.js";
import Amenity from "../models/amenities.model.js";
import Lifestyle from "../models/lifestyle.model.js";
import { v2 as cloudinary } from "cloudinary"; 

export const deletePost = async (req, res) => {
  const postid = req.params.id;
  const Post = await Residence.findById(postid);
  if (!Post) {
    return res.status(404).json({ error: "Post Not Found" });
  }
  console.log(Post);
  try {
    if (Post.amenities) {
      await Amenity.findByIdAndDelete(Post.amenities);
    }
    if (Post.lifestyle) {
      await Lifestyle.findByIdAndDelete(Post.lifestyle);
    }

    if (Post.photos && Post.photos.length > 0) {
      const deletePromises = Post.photos.map((photo) =>
        cloudinary.uploader.destroy(photo.public_id)
      );
      await Promise.all(deletePromises);
    }

    const deletedPost = await Residence.findByIdAndDelete(postid);
    if (!deletedPost) {
      return res.status(404).json({ error: "Listing Not Found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
