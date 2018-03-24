const utils = require('../utils');
const Wheels = require('./wheels');

const schema = new utils.mongoose.Schema({
  username: String,
  password: String,
  token: String
});

const Account = utils.mongoose.model("account", schema);

Account.findByToken = async token => await Account.findOne({token});

Account.setToken = async (username, token) =>
  await Account.findOneAndUpdate(
    {username},
    {token}
  );

Account.removeToken = async username =>
  await Account.findOneAndUpdate(
    {username},
    {token: null}
  );


Account.findByUsername = async username => await Account.findOne({username});


Account.create = async data => {
  if (!!await Account.findByUsername(data.username))
    throw utils.error.ALREADY_EXISTS('username');
  return await  new Account({
    username: data.username,
    password: data.password
  }).save();
};

Account.remove = async username => {
  await Wheels.removeAll(username);
  return await Account.findOneAndRemove({username});
};

module.exports = Account;
