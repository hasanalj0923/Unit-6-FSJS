const express = require('express');
const path = require('path');
const app = express();

// Import routes
const routes = require('./routes');

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use your routes
app.use('/', routes);

// Catch all for undefined routes - send 404
app.use((req, res) => {
  res.status(404).render('page-not-found', { url: req.originalUrl });
});

// Error handling middleware - must be last
app.use((err, req, res, next) => {
  console.error(err);  // Log full error stack, not just message
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode);
  res.render('error', { err });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
