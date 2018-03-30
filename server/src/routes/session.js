const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const db = require('../db');
const jwt = require('jsonwebtoken');
const utils = require('../utils');
const middleware = require('../middleware');

const setToken = async (userId, username) => {
  const token = jwt.sign(
    {id: userId},
    config.get('server.secret.secret'),
    {expiresIn: config.get('server.secret.expiresIn')}
  );
  await db.Account.setToken(username, token);
  return token;
};

const router = utils.asyncRouter(express.Router());

router.get('/auth', middleware.authenticate, async (req, res) => {
  res.sendStatus(200);
});

router.post('/signup', async (req, res, next) => {
  const {username, password} = req.body;
  if (!utils.validator.isUsername(username))
    return next(utils.error.INCORRECT_USERNAME);
  if (!utils.validator.isPassword(password))
    return next(utils.error.INCORRECT_PASSWORD);
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(config.get('server.secret.saltRounds')));
  const acc = await db.Account.create({username, password: hashedPassword});
  const token = await setToken(acc._id, username);
  res.status(200).send({token});
});

router.post('/signin', async (req, res, next) => {
  const {username, password} = req.body;
  const acc = await db.Account.findByUsername(username);
  if (!acc || !(bcrypt.compareSync(password, acc.password)))
    return next(utils.error.INCORRECT_CREDENTIALS);
  const token = await setToken(acc._id, username);
  res.status(200).send({token});
});

module.exports = router;