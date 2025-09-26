const { Sequelize } = require('sequelize');
const config = require('../config/database');


const sequelize = new Sequelize(config.database, config.username, config.password, {
host: config.host,
dialect: config.dialect,
logging: config.logging
});


const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Step = require('./step')(sequelize, Sequelize);
db.StepHistory = require('./stepHistory')(sequelize, Sequelize);


// Associations
db.Step.hasMany(db.StepHistory, { foreignKey: 'step_id', as: 'histories' });
db.StepHistory.belongsTo(db.Step, { foreignKey: 'step_id', as: 'step' });


module.exports = db;