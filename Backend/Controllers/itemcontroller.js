const Item = require('../Modal/itemdata');

// Add a new item
const addItem = async (req, res) => {
  try {
    const { name, imageLink, price, description, category } = req.body;

    const newItem = await Item.create({
      name,
      imageLink,
      price,
      description,
      category,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    const categorizedItems = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
    res.status(200).json(categorizedItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item
const updateItem = async (req, res) => {
  try {
    const { name, imageLink, price, description, category } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, imageLink, price, description, category },
      { new: true } // Return the updated document
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};
