const stepService = require('../services/step.service');


async function create(req, res, next) {
try {
const step = await stepService.createStep(req.body);
res.status(201).json(step);
} catch (err) { next(err) }
}


async function update(req, res, next) {
try {
const step = await stepService.updateStep(req.params.id, req.body);
res.json(step);
} catch (err) { next(err) }
}


async function remove(req, res, next) {
try {
await stepService.deleteStep(req.params.id);
res.status(204).send();
} catch (err) { next(err) }
}


async function list(req, res, next) {
try {
const steps = await stepService.listSteps();
res.json(steps);
} catch (err) { next(err) }
}


async function history(req, res, next) {
try {
const histories = await stepService.getHistoryForStep(req.params.id);
res.json(histories);
} catch (err) { next(err) }
}


module.exports = { create, update, remove, list, history };