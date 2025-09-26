const express = require('express');
const app = express();
const stepRoutes = require('./routes/step.routes');
const errorHandler = require('./middlewares/errorHandler');


app.use(express.json());
app.use('/api/steps', stepRoutes);
app.use(errorHandler);


module.exports = app;