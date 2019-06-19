'use strict'
// Imports
const express = require('express');
const api = express.Router();
const controller = require('../controllers/user');

// Endpoints
api.post('/user', controller.Create);

api.get('/user', controller.GetUsers);

module.exports = api;