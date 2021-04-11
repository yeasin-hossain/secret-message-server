/* eslint-disable radix */
const { genSaltSync, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');
const { yupUserSchema } = require('../yupValidation/yupValidation');

module.exports.newUser = async (req, res) => {
  const userData = new Users(req.body);
  try {
    await yupUserSchema.validate(userData, {
      abortEarly: false,
    });

    const salt = genSaltSync(parseInt(process.env.SALT));
    const hashedPassword = await hash(userData.password, salt);
    userData.password = hashedPassword;

    const saveUser = await userData.save(userData);
    const userName = {
      userName: saveUser.userName,
    };
    const token = jwt.sign(userName, process.env.JWT_SECRET, {
      expiresIn: '100m',
    });
    res.status(200).json({ ...userName, token });
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
