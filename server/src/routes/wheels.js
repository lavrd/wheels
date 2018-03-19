const express = require('express');
const middleware = require('../middleware');
const db = require('../db');
const utils = require('../utils');

const router = utils.asyncRouter(express.Router());

router.post('/', middleware.authenticate, async (req, res, next) => {
  const {acc, body} = req;
  const error = utils.validator.isWheel(body);
  if (!!error)
    return next(error);
  body.username = acc.username;
  await db.Wheels.create(body);
  res.sendStatus(200);
});

router.delete('/', middleware.authenticate, async (req, res) => {
  const {acc, body, query} = req;
  if (!!query.all)
    await db.Wheels.removeAll(acc.username);
  else
    await db.Wheels.remove(acc.username, body.name);
  res.sendStatus(200);
});

router.put('/', middleware.authenticate, async (req, res, next) => {
  const {acc, body} = req;
  const error = utils.validator.isWheel(body);
  if (!!error)
    return next(error);
  await db.Wheels.update(acc.username, body);
  res.sendStatus(200);
});

router.get('/', middleware.authenticate, async (req, res) => {
  const {acc} = req;
  const wheels = await db.Wheels.findByUsername(acc.username);
  res.status(200).send(wheels);
});

module.exports = router;
