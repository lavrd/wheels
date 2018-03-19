const utils = require('../utils');

const schema = new utils.mongoose.Schema({
  name: String,
  description: String,
  model: String,
  preview: String,
  price: Number,
  username: String
});

const Wheels = utils.mongoose.model("wheels", schema);

Wheels.findByUsernameAndName = async (username, name) => {
  return await Wheels.findOne({username, name});
};

Wheels.findByUsername = async username => {
  return await Wheels.find({username});
};

Wheels.removeAll = async username => {
  console.log(username);
  return await Wheels.deleteMany({username});
};

Wheels.update = async (username, data) => {
  return await Wheels.findOneAndUpdate(
    {username: username, _id: data.id},
    data
  );
};

Wheels.remove = async (username, name) => {
  return await Wheels.findOneAndRemove({username, name});
};

Wheels.create = async (data) => {
  if (!!await Wheels.findByUsernameAndName(data.username, data.name))
    throw utils.error.ALREADY_EXISTS('wheel');
  const wheels = new Wheels({
    username: data.username,
    name: data.name,
    model: data.model,
    preview: data.preview,
    price: data.price,
    description: data.description
  });
  return await wheels.save();
};

module.exports = Wheels;
