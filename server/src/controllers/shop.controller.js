import Shop from '../models/shop.models.js';
import uploadOnCloudinary from '../utils/claoudinary.js';

export const createShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;

    if (!name || !city || !state || !address) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'Shop image is required' });
    }

    const imagePath = req.file.path;
    const imageUrl = await uploadOnCloudinary(imagePath);

    if (!imageUrl) {
      return res
        .status(500)
        .json({ success: false, message: 'Failed to upload shop image' });
    }
    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image: imageUrl,
      owner: req.user.id,
    });
    await shop.populate('owner');
    return res
      .status(201)
      .json({ success: true, message: 'Shop created successfully', shop });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create shop' });
  }
};
