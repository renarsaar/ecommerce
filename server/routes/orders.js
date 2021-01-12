const router = require('express').Router();
const axios = require('axios');
const Order = require('../model/Order');
const { makeOrderValidation } = require('../validation');

// @desc    Make a new order
// @route   POST /orders
router.post('/', async (req, res) => {
  // Validation
  const { error } = makeOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    user: req.body.user,
    email: req.body.email,
    product: req.body.product,
    totalPrice: req.body.totalPrice,
    delivery: req.body.delivery,
  });

  // Make a new order
  try {
    await order.save();
    res.status(201).send('Order created successfully');
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// @desc    Get Itella parcel terminal locations
// @route   GET /orders/itella
router.get('/omniva', async (req, res) => {
  const BASE_URL = 'https://www.omniva.ee/locations.json';

  axios.get(BASE_URL)
    .then((response) => res.send(response.data))
    .catch((error) => res.status(500).send({ message: error.message }));
});

module.exports = router;
