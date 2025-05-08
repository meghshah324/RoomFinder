import cloudinary from "../config/cloudinary.config.js";
import Residence from "../models/residence.model.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage }).array('images', 5);

const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'roommatefinder',
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(file.buffer);
  });
};

export const uploadImages = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading images', error: err.message });
    }

    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }

      const uploadPromises = req.files.map(file => uploadToCloudinary(file));
      const results = await Promise.all(uploadPromises);

      const uploadedImages = results.map(result => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));

      const user = await Residence.findByIdAndUpdate(
        req.params.id,
        { $push: { photos: { $each: uploadedImages } } },
        { new: true }
      );

      res.json({ 
        message: 'Upload successful', 
        images: uploadedImages, 
        user 
      });

    } catch (err) {
      console.error('Upload failed:', err);
      res.status(500).json({ 
        message: 'Upload failed', 
        error: err.message 
      });
    }
  });
};