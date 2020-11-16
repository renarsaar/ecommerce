const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../model/User');
const {
  loginValidation,
  registerValidation,
  editUserValidation,
} = require('../validation');

// @desc    Register a new user
// @route   POST /auth/register
// @access  public
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
// @route   POST /auth/login
// @access  public
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

  // Create and assign jwt token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('x-auth-token', token).send({ token });
});

// @desc  Get user data w/o password
// @route GET /auth/user
// @access private
router.get('/user', auth, (req, res) => {
  User.findById(req.user._id)
    .select('-password')
    .then((user) => res.json(user));
});

// @desc    Edit user password
// @route   PATCH /auth/:id
// @access  private
router.patch('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id);

  // Check for user input
  if (req.body.password) {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
  }

  // Validation
  const { error } = editUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update user password
  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete user
// @route   POST /auth/:id
// @access  private
router.delete('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
