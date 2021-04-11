const Users = require('../model/userModel');
const { yupUserSchema } = require('../yupValidation/yupValidation');

module.exports.newUser = async (req, res) => {
  const userData = new Users(req.body);
  try {
    await yupUserSchema.validate(userData, {
      abortEarly: false,
    });
    const saveUser = await userData.save(userData);
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(501).json(err);
  }
};

// Get SIngle user
module.exports.getUser = async (req, res) => {
  try {
    const user = await Users.find({ userName: req.params.name });
    res.status(200).json(user);
  } catch (err) {
    res.status(501).json(err);
  }
};
