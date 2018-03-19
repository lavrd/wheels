const express = require('express');
const morgan = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: config.get('server.limit')}));
app.use(cors());

require('./routes/index')(app);

app.use((error, req, res, next) => {
  console.error(error);
  if (!error.code || !error.message) {
    error = utils.error.INTERNAL_SERVER_ERROR;
  }
  res.status(error.code).send({message: error.message});
});

const port = config.get('server.port');
app.listen(port, () => console.log(`server listen on ${port} port`));
