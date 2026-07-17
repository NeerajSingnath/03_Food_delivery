import Shop from '../models/shop.models.js';
import uploadOnCloudinary from '../utils/claoudinary.js';

export const createAndEditShop = async (req, res) => {
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
    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image: imageUrl,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findOneAndUpdate(
        { _id: shop._id },
        {
          name,
          city,
          state,
          address,
          image: imageUrl,
          owner: req.userId,
        },
        { new: true },
      );
    }

    await shop.populate('owner');
    return res.status(201).json({
      success: true,
      message: 'Shop Details updated Successfully',
      shop,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create shop' });
  }
};

export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId })
      .populate({
        path: 'items',
        options: { sort: { createdAt: -1 } },
      })
      .populate('owner');

    if (!shop) {
      return null;
    }
    return res.status(200).json({ success: true, message: 'Shop found', shop });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to get shop details' });
  }
};

export const getShopByCity = async (req, res) => {
  try {
    const { city } = req.params;
    console.log(city);
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, 'i') },
    })
      .populate('owner')
      .populate('items');
    if (!shops) {
      return res
        .status(404)
        .json({ success: false, message: 'No shops found' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Shops found', shops });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to get shops' });
  }
};
