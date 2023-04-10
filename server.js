const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Sets up the Express app
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up controllers/routers
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log('\x1b[33m', `Server listening on http://localhost:${PORT}.`);
  });
});
