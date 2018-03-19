const express = require('express');
const bcrypt = require('bcrypt');
const config = require('config');
const db = require('../db');
const jwt = require('jsonwebtoken');
const utils = require('../utils');

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

router.post('/signup', async (req, res, next) => {
  const {username, password} = req.body;
  if (!username || username.length > 64 || !utils.validator.isAscii(username))
    return next(utils.error.INCORRECT_USERNAME);
  if (!password || !(password.length >= 8 && password.length <= 64))
    return next(utils.error.INCORRECT_PASSWORD);
  const hashedPassword = await bcrypt.hash(password, config.get('server.secret.saltRounds'));
  const acc = await db.Account.create({username, password: hashedPassword});
  const token = await setToken(acc._id, username);
  res.status(200).send({token});
});

router.post('/signin', async (req, res, next) => {
  const {username, password} = req.body;
  const acc = await db.Account.findByUsername(username);
  if (!acc || !(await bcrypt.compare(password, acc.password)))
    return next(utils.error.INCORRECT_CREDENTIALS);
  const token = await setToken(acc._id, username);
  res.status(200).send({token});
});

module.exports = router;
