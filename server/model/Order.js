const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Order', orderSchema);
