const router = require('express').Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const Order = require('../model/Order');
const User = require('../model/User');
const Product = require('../model/Product');
const { makeOrderValidation } = require('../validation');

// @desc    Get all orders
// @route   GET /orders
router.get('/', paginatedResults(Order), async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get all orders made from 1 user
// @route   GET /orders/:username
router.get('/user/:userName', paginatedResults(Order), async (req, res) => {
  try {
    res.status(200).json(res.paginatedResults);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get single order
// @route   GET /orders/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const user = await User.findById(req.user._id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Validate if admin
    if (user.isAdmin) {
      return res.status(200).send(order);
    }

    // Validate if orderer & user are the same
    if (user.name === order.user) {
      return res.status(200).send(order);
    }

    return res.status(500).send('Something went wrong. Please try again later.');
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// @desc    Make a new order
// @route   POST /orders
router.post('/', async (req, res) => {
  // Validation
  const { error } = makeOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    user: req.body.user,
    email: req.body.email,
    products: req.body.products,
    totalPrice: req.body.totalPrice,
    delivery: req.body.delivery,
  });

  try {
    // Map all products and remove quantity from db
    order.products.map(async (product) => {
      const collectionProduct = await Product.findById(product.id);

      // Find the index of the size in the stock array
      const index = collectionProduct.sizes.findIndex((size) => size === product.size);

      collectionProduct.stock[index] -= product.quantity;

      // Rewrite the whole stock array
      collectionProduct.updateOne({ stock: collectionProduct.stock }, (err) => {
        if (err) res.status(400).send({ message: 'Failed to create an order. Please try again later' });
      });
    });

    // Make a new order
    await order.save();
    res.status(201).send('Order created successfully');
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// @desc    Change order completed status
// @route   PATCH /orders/status/:id
router.patch('/status/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;
  const order = await Order.findById(id);
  const user = await User.findById(req.user._id);
  const allowedStatuses = ['Active', 'Cancelled', 'Completed', 'Seen By Admin', 'Recieved'];

  // Validate if admin
  if (!user.isAdmin) {
    return res.status(401).send('Unauthorized');
  }

  // Check if not unknown status
  if (!allowedStatuses.includes(newStatus)) {
    return res.status(400).send('Unknown status');
  }

  order.status = newStatus;

  try {
    await order.save();

    res.status(200).send('Status Changed');
  } catch (error) {
    res.status(500).send('Something went wrong. Please try again later.');
  }
});

// @desc    Get Omniva parcel terminal locations
// @route   GET /orders/omniva
router.get('/omniva', async (req, res) => {
  const BASE_URL = 'https://www.omniva.ee/locations.json';

  axios.get(BASE_URL)
    .then((response) => res.send(response.data))
    .catch((error) => res.status(500).send({ message: error.message }));
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    try {
      results.results = await model.find();

      // Filter orders by username if username in params
      if (req.params.userName) {
        results.paginatedResults = await model.find({ user: req.params.userName })
          .limit(limit)
          .skip(startIndex)
          .exec();
      } else {
        results.paginatedResults = await model.find().limit(limit).skip(startIndex).exec();
      }
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = router;
