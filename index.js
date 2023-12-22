const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/posapi', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server started and running on port ${port}`);
  });
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  // Exit the process if there is a database connection error
  process.exit(1);
});

app.get('/test-api', (req, resp) => {
  return resp.json({ 'message': 'Server started' });
});
