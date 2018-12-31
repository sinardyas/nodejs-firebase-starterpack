require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const enrouten = require('express-enrouten');
require('./configs/firebase');

/* eslint-disable no-console */

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(enrouten({
  directory: path.join(__dirname, 'controllers'),
}));

app.use((err, req, res, next) => res.status(500).json({ message: 'Internal server error!', error: err }));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
