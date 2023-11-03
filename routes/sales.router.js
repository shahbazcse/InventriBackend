const express = require('express');
const router = express.Router();
const Sale = require('../models/sale.model');
const dummyData = require('../db/dummyData');

// Get All Sales API
router.get('/', async (req, res) => {
  try {
    const sales = await getAllSales();
    if (sales.length === 0) {
      seedSalesData();
    }
    res.status(200).json({
      message: "Sales Found",
      sales
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
});

async function getAllSales() {
  try {
    const sales = await Sale.find().populate('item', 'costPrice');
    return sales;
  } catch (error) {
    throw error;
  }
}

// Create New Sale API
router.post('/', async (req, res) => {
  try {
    const { saleData } = req.body;
    const sale = await addSale(saleData);
    res.status(201).json({
      message: "Sale Added",
      sale
    })
  } catch (e) {
    res.status(500).json({
      error: e.message,
    })
  }
})

async function addSale(saleData) {
  try {
    const newSale = new Sale(saleData);
    const createdSale = await newSale.save();
    return createdSale;
  } catch (error) {
    throw error;
  }
}

const seedSalesData = () => {
  dummyData.sales.forEach((sale) => addSale(sale));
  console.log("Seeded...");
}

module.exports = router;