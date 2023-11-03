const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
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
  profit: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
})

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;