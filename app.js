'use strict';
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 7777;
const server = app.listen(port);
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', require('./routers/router'));