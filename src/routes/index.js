const express = require( 'express');

const sections = require( './sections');

const app = express();

app.use('/', sections);


module.exports = app;