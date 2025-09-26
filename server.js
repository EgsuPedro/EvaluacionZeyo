const app = require('./app');
const { sequelize } = require('./models');


const PORT = process.env.PORT || 3000;


async function start()