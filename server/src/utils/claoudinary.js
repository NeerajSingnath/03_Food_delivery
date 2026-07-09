import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    const response = await cloudinary.uploader.upload(filePath, {
      folder: 'foodDelivery',
    });

    if (response) {
      fs.unlinkSync(filePath);
    }
    return response.secure_url;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath);
    return null;
  }
};

export default uploadOnCloudinary;
