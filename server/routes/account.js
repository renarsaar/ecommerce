const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');
const {
  loginValidation,
  registerValidation,
  editUserValidation,
} = require('../validation');

// @desc    Register a new user
// @route   POST /account/register
router.post('/register', async (req, res) => {
  // Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for duplicates
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @desc    Log in
// @route   POST /account/login
router.post('/login', async (req, res) => {
  // Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Incorrect credentials');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid Password!');

  res.send('Logged in!');
});

// @desc    Edit user password
// @route   PATCH /account
router.patch('/:id', getUser, async (req, res) => {
  // Check for user input
  if (req.body.password) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    res.user.password = hashPassword;
  }

  // Validation
  const { error } = editUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update user
  try {
    const updatedUser = await res.user.save();
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete user
// @route   POST /account
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get User by ID Middleware
async function getUser(req, res, next) {
  let user;

  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }

  res.user = user;
  next();
}

module.exports = router;
