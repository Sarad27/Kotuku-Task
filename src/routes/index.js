const express = require( 'express');

const sections = require( './sections');

const app = express();

app.use('/section', sections);


module.exports = app;