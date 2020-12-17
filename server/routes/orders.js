const router = require('express').Router();
const Order = require('../model/Order');
const { makeOrderValidation } = require('../validation');

// @desc    Make a new order
// @route   POST /orders
router.post('/', async (req, res) => {
  // Validation
  const { error } = makeOrderValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = new Order({
    userId: req.body.userId,
    product: req.body.product,
    totalPrice: req.body.totalPrice,
    deliveryMethod: req.body.deliveryMethod,
  });

  // Make a new order
  try {
    await order.save();
    res.status(201).send('Order created successfully');
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
