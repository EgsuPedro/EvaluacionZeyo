const db = require('../models');
const { computeHash } = require('../utils/hash');


async function getLastHashForStep(stepId) {
const last = await db.StepHistory.findOne({
where: { step_id: stepId },
order: [['id', 'DESC']]
});
return last ? last.hash : null;
}


async function createStep(data, transaction) {
// transaction optional (Sequelize transaction)
const step = await db.Step.create(data, { transaction });
// create history record
const prevHash = await getLastHashForStep(step.id);
const payload = JSON.stringify({ step_id: step.id, title: step.title, position: step.position, action: 'CREATE', prev_hash: prevHash });
const hash = computeHash(payload + Date.now());
await db.StepHistory.create({ step_id: step.id, title: step.title, description: step.description, position: step.position, action: 'CREATE', prev_hash: prevHash, hash }, { transaction });
return step;
}


async function updateStep(id, data, transaction) {
const step = await db.Step.findByPk(id);
if (!step) throw { status: 404, message: 'Step not found' };
await step.update(data, { transaction });
const prevHash = await getLastHashForStep(step.id);
const payload = JSON.stringify({ step_id: step.id, title: step.title, position: step.position, action: 'UPDATE', prev_hash: prevHash });
const hash = computeHash(payload + Date.now());
await db.StepHistory.create({ step_id: step.id, title: step.title, description: step.description, position: step.position, action: 'UPDATE', prev_hash: prevHash, hash }, { transaction });
return step;
}


async function deleteStep(id, transaction) {
const step = await db.Step.findByPk(id);
if (!step) throw { status: 404, message: 'Step not found' };
await db.sequelize.transaction(async (t) => {
await db.StepHistory.create({ step_id: step.id, title: step.title, description: step.description, position: step.position, action: 'DELETE', prev_hash: await getLastHashForStep(step.id), hash: computeHash('delete' + Date.now()) }, { transaction: t });
await step.destroy({ transaction: t });
});
return true;
}


async function listSteps() {
return db.Step.findAll({ order: [['position', 'ASC']] });
}


async function getHistoryForStep(stepId) {
return db.StepHistory.findAll({ where: { step_id: stepId }, order: [['id', 'ASC']] });
}


module.exports = { createStep, updateStep, deleteStep, listSteps, getHistoryForStep };