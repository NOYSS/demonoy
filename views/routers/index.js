'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config');


router.get('/', function (req, res, next) {
   
        res.render('index');
    
});

router.post('/get', function (req, res) {
    fs.readFile(config.pathviews + req.body.data + '.html', 'utf8', function (err, data) {
        const response = { status: true, message: data };
        res.json(response);
    });
});

module.exports = router;