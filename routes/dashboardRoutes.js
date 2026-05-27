const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;