const express = require('express');
const path = require('path');

export function addMiddlewares(app) {
  app.use('/images', express.static(path.join(__dirname, '../src/static/images')));
}