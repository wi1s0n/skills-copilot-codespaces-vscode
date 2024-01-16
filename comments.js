// Create web server

// Import express
const express = require('express');
const app = express();

// Import body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import cors
const cors = require('cors');
app.use(cors());

// Import mongoose
const mongoose = require('mongoose');

// Import dotenv
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const routes = require('./routes');

// Import middleware
const middleware = require('./middleware');

// Import error handlers
const errorHandler = require('./handlers/errorHandler');

// Connect to the database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Check if the database is connected
mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

// Check if there is an error on connecting to the database
mongoose.connection.on('error', (err) => {
  console.log('Error on connecting to the database: ' + err);
});

// Use routes
app.use('/api', routes);

// Use middleware
app.use(middleware.notFound);

// Use error handlers
app.use(errorHandler);

// Create server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});