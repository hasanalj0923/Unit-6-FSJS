const express = require('express');
const router = express.Router();

const data = require('./data.json');
const dataLen = data.projects.length;

// Home page route
router.get('/', (req, res) => {
  res.locals.projects = data.projects;
  res.render('index');
});

// About page route
router.get('/about', (req, res) => {
  res.render('about');
});

// Project detail route with safer validation
router.get('/project/:id', (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0 || id >= dataLen) {
    const err = new Error('Project Not Found');
    err.statusCode = 404;
    return next(err);
  }
  res.locals.project = data.projects[id];
  res.render('project');
});

// 404 handler for unknown routes
router.use((req, res, next) => {
  res.status(404);
  res.render('page-not-found', { url: req.originalUrl });
});

// Error handler middleware
router.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode);
  res.render('error', { error: err });
});

module.exports = router;
