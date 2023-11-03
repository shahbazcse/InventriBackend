const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;