const express = require('express');
const router = express.Router();
const Item = require('../models/item.model');
const dummyData = require('../db/dummyData');

// Get All Items API
router.get('/', async (req, res) => {
  try {
    const items = await getAllItems();
    if (items.length === 0) {
      seedItemsData();
    }
    res.status(200).json({
      message: "Items Found",
      items
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
});

async function getAllItems() {
  try {
    const items = await Item.find();
    return items;
  } catch (error) {
    throw error;
  }
}

// Create New Item API
router.post('/', async (req, res) => {
  try {
    const { itemData } = req.body;
    const item = await addItem(itemData);
    res.status(201).json({
      message: "Item Added",
      item
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
})

async function addItem(itemData) {
  try {
    const newItem = new Item(itemData);
    const createdItem = await newItem.save();
    return createdItem;
  } catch (error) {
    throw error;
  }
}

// Update an item API
router.post('/update-item', async (req, res) => {
  try {
    const { updatedData } = req.body;
    const item = await updateItem(updatedData);
    res.status(200).json({
      message: "Item Updated",
      item
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
})

async function updateItem(updatedData) {
  try {
    const item = await Item.findOne({ _id: updatedData._id });
    if (item) {
      const updatedItem = await Item.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
      return updatedItem;
    } else {
      throw new Error("Item Not Found");
    }
  } catch (error) {
    throw error;
  }
}

// Delete an item API
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await deleteItem(itemId);
    res.status(200).json({
      message: "Item Deleted",
      item
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
})

async function deleteItem(itemId) {
  try {
    const foundItem = await Item.findOne({ _id: itemId });
    if (!foundItem) {
      throw new Error("Item Not Found");
    }
    const item = await Item.findByIdAndDelete(itemId);
    return item;
  } catch (error) {
    throw error;
  }
}

const seedItemsData = () => {
  dummyData.items.forEach((item) => addItem(item));
  console.log("Seeded...");
}

module.exports = router;