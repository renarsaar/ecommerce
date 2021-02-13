const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = require('url');
const generator = require('generate-password');
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
    console.log(err.message)
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

  // Get token info from OAuth2Client response
  const tokenInfo = await oAuth2Client.getTokenInfo(oAuth2Client.credentials.access_token);

  // Get user credentials from Google people API
  const peopleAPIResponse = await oAuth2Client.request({ url: 'https://people.googleapis.com/v1/people/me?personFields=names' });

  // User data
  const userEmail = tokenInfo.email;
  const userName = peopleAPIResponse.data.names[0].displayName;
  const userId = peopleAPIResponse.data.names[0].metadata.source.id;

  // Find the user with the same Email as OAuth Email
  let user = await User.findOne({ email: userEmail });

  // If user without googleId exists in database, verify
  if (user && !user.googleId) {
    return res.redirect(url.format({
      pathname: `http://localhost:3000/account/validation/${user._id}`,
      query: {
        id: `${user._id}`,
        googleId: userId,
        email: userEmail,
        name: userName,
      },
    }));
  }

  // If user with googleId exists in database
  if (user && user.googleId) {
    // Create and assign jwt token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);

    // Log user in, redirect to /
    return res.redirect(url.format({
      pathname: 'http://localhost:3000/',
      query: {
        token,
      },
    }));
  }

  // If OAuth user does not exists in database
  if (!user) {
    // Make a random password that is required by User model
    const password = generator.generate({
      length: 40,
      numbers: true,
      symbols: true,
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Make a new user, add to database
    const newUser = new User({
      googleId: userId,
      name: userName,
      email: userEmail,
      password: hashPassword,
    });

    try {
      await newUser.save();

      // Request a new user to get user._id
      user = await User.findOne({ email: userEmail });

      // Create and assign jwt token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);

      // Log user in, redirect to /
      return res.redirect(url.format({
        pathname: 'http://localhost:3000/',
        query: {
          token,
        },
      }));
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
});

// @desc    Validate user & add google sign in method
// @route   PATCH /auth/validation
// @access  public
router.patch('/validation/:id', async (req, res) => {
  // Check if the email exists
  const user = await User.findById(req.params.id);
  if (!user) return res.status(500).send('Validation error, please try again later');

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid Password!');

  user.googleId = req.body.googleId;

  // Update user password
  try {
    await user.save();

    // Create, assign jwt token & send user credentials
    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
    res.status(201).header('x-auth-token', token).send({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      admin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
  res.header('x-auth-token', token).send({
    token,
    id: user._id,
    name: user.name,
    email: user.email,
    admin: user.isAdmin,
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
  const { oldPassword, password, confirmPassword } = req.body;

  // Check for user input
  if (oldPassword === '' || password === '' || confirmPassword === '') {
    return res.status(400).send('Please fill in all fields');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Check if password is correct
  const validPass = await bcrypt.compare(oldPassword, user.password);
  if (!validPass) return res.status(400).send('Invalid Password!');

  // Validation
  const { error } = editUserValidation({ password });
  if (error) return res.status(400).send(error.details[0].message);

  // Hash password and set new password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashPassword;

  // Update user password
  try {
    await user.save();
    res.status(201).send('Password changed');
  } catch (err) {
    res.status(400).send(err.message);
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
