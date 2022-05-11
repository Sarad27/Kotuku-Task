const express = require('express');

require('dotenv').config(); 

const app = express();

require('./helper/cache-helper');

const apiRoutes = require('./routes');

app.use(express.json());


app.use('/', apiRoutes);

const port = process.env.PORT  || 5000;

app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});
