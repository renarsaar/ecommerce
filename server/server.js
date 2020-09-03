const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
