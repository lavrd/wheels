module.exports = (app) => {
  app.use('/', require('./session'));
  app.use('/acc', require('./account'));
  app.use('/wheels', require('./wheels'));
};
