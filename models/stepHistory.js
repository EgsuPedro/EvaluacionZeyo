module.exports = (sequelize, DataTypes) => {
const StepHistory = sequelize.define('StepHistory', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
step_id: { type: DataTypes.INTEGER, allowNull: false },
title: { type: DataTypes.STRING, allowNull: false },
description: { type: DataTypes.TEXT },
position: { type: DataTypes.INTEGER },
action: { type: DataTypes.STRING, allowNull: false },
prev_hash: { type: DataTypes.STRING },
hash: { type: DataTypes.STRING, allowNull: false }
}, {
tableName: 'step_histories',
timestamps: true,
createdAt: 'created_at',
updatedAt: false
});
return StepHistory;
};