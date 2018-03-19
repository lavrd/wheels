const express = require('express');
const middleware = require('../middleware');
const db = require('../db');
const utils = require('../utils');

const router = utils.asyncRouter(express.Router());

router.get('/', middleware.authenticate, async (req, res) => {
  const {acc} = req;
  res.status(200).send({username: acc.username});
});

router.delete('/', middleware.authenticate, async (req, res) => {
  const {acc} = req;
  await db.Account.remove(acc.username);
  res.sendStatus(200);
});

module.exports = router;
