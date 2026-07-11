import Item from '../models/item.model.js';
import Shop from '../models/shop.models.js';
import uploadOnCloudinary from '../utils/claoudinary.js';

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    const image = req.file;
    if (!name || !price || !foodType || !category || !image) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    let imageUrl = '';
    if (image) {
      const imagePath = image.path;
      const upload = await uploadOnCloudinary(imagePath);
      if (!upload) {
        return res
          .status(500)
          .json({ success: false, message: 'Failed to upload image' });
      }
      imageUrl = upload;
    }

    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res
        .status(400)
        .json({ success: false, message: 'Shop not found' });
    }

    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image: imageUrl,
      shop: shop._id,
    });

    shop.items.push(item._id);
    await shop.save();

    return res
      .status(201)
      .json({ success: true, message: 'Item added successfully', item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
