import Item from '../models/item.model.js';
import Shop from '../models/shop.models.js';
import uploadOnCloudinary from '../utils/claoudinary.js';

export const addItem = async (req, res) => {
  console.log('here');
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

    await shop.populate({
      path: 'items',
      options: { sort: { createdAt: -1 } },
    });

    await shop.populate('owner');

    return res
      .status(201)
      .json({ success: true, message: 'Item added successfully', shop });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, price, category, foodType } = req.body;
    const image = req.file;
    if (!name || !price || !category || !foodType) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res
        .status(400)
        .json({ success: false, message: 'Item not found' });
    }

    let imageUrl = item.image;
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

    item.name = name;
    item.price = price;
    item.category = category;
    item.foodType = foodType;
    item.image = imageUrl;

    await item.save();

    const shop = await Shop.findOne({ owner: req.userId })
      .populate({
        path: 'items',
        options: { sort: { createdAt: -1 } },
      })
      .populate('owner');
    return res
      .status(200)
      .json({ success: true, message: 'Item updated successfully', shop });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to update item' });
  }
};

export const getItemByID = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId);
    const item = await Item.findById(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: 'Item not found' });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to get item' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: 'Item not found' });
    }
    const shop = await Shop.findOneAndUpdate(
      { owner: req.userId },
      { $pull: { items: itemId } },
      { new: true },
    )
      .populate({
        path: 'items',
        options: { sort: { createdAt: -1 } },
      })
      .populate('owner');
    return res
      .status(200)
      .json({ success: true, message: 'Item deleted successfully', shop });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete item' });
  }
};

export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    console.log(city);
    if (!city) {
      return res
        .status(400)
        .json({ success: false, message: 'City is required' });
    }

    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, 'i') },
    }).populate('items');
    if (!shops) {
      return res
        .status(404)
        .json({ success: false, message: 'Shop not found' });
    }

    const shopIds = shops.map((shop) => shop._id);

    const items = await Item.find({ shop: { $in: shopIds } });

    return res
      .status(200)
      .json({ success: true, message: 'Item found', items });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to get item' });
  }
};
