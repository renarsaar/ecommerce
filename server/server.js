const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');

// Load config
dotenv.config({ path: './.env' });

connectDB();

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Route Middlewares
app.use('/products', require('./routes/products'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
