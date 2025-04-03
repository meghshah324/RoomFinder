import Residence from "../models/residence.model.js";

export const deletePost = async (req, res) => {
  const postid = req.params.id;
  const Post = await Residence.findById(postid);
  console.log(Post);
  try {
    const deletedPost = await Residence.findByIdAndDelete(postid);

    if (!deletedPost) {
      return res.status(404).json({ error: "Listing Not Found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
