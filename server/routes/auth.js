const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = require('url');
const { google } = require('googleapis');
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

// Init OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL,
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

// @desc Send the OAuth2 link to client
// @route GET /auth/google/
// @access public
router.get('/google', async (req, res) => {
  // Generate OAuth2 link for OAuth2 workflow
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  // Go through the OAuth2 content workflow.
  try {
    res.status(200).send(authorizeUrl);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// @desc Retrieve the full client from OAuth2 workflow
// @route GET /auth/google/callback
// @access public
router.get('/google/callback', async (req, res) => {
  // Acquire the code from the querystring
  const qs = new url.URL(req.url, 'http://localhost:8080').searchParams;
  const code = qs.get('code');

  // Acquire tokens with code & set the credentials on the OAuth2 client
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Get the user email address
  const tokenInfoEmail = await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token,
  );

  // Get user names from peoples API
  const tokenInfoName = await oAuth2Client.request({ url: 'https://people.googleapis.com/v1/people/me?personFields=names' });

  console.log(tokenInfoEmail.email);
  console.log(tokenInfoName.data.names[0].displayName);

  res.redirect('http://localhost:3000/');
  /**
   *    (if googleId exists in db)
   *        login, send credentials
   *    (if google id does not exists in db, but email does)
   *        add googleId to existing user
   *        login, send credentials
   *    (if googleId && gmail does not exists in db)
   *        make a new user, fill in User details
   *        login, send credentials
   * res.redirect('/)
   */
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
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
  res.header('x-auth-token', token).send({
    token,
    id: user._id,
    name: user.name,
    email: user.email,
  });
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
