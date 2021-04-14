/* eslint-disable radix */
const { genSaltSync, hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/userModel');
const { yupUserSchema, yupLoginUser } = require('../yupValidation/yupValidation');

module.exports.newUser = async (req, res, next) => {
  const userData = new Users(req.body);
  try {
    await yupUserSchema.validate(userData, {
      abortEarly: false,
    });
    const existingUser = await Users.findOne({ userName: userData.userName });
    console.log(existingUser);
    if (existingUser) {
      const error = new Error('User exists');
      res.status(403);
      throw error;
    }
    const salt = genSaltSync(parseInt(process.env.SALT));
    const hashedPassword = await hash(userData.password, salt);
    userData.password = hashedPassword;

    const saveUser = await userData.save(userData);
    const payload = {
      name: saveUser.name,
      userName: saveUser.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.status(200).json({ ...payload, token });
  } catch (err) {
    next(err);
  }
};

// Login User

// eslint-disable-next-line consistent-return
module.exports.loginUser = async (req, res, next) => {
  const userCredational = req.body;
  try {
    const validate = await yupLoginUser.isValid(userCredational, {
      abortEarly: false,
    });

    if (!validate) {
      return res.status(200).json({ message: 'invalid user validation error' });
    }
    const user = await Users.findOne({ userName: userCredational.userName });
    if (!user) {
      return res.status(200).json({ message: 'invalid user not found' });
    }
    const validatePassword = await compare(userCredational.password, user.password);

    if (!validatePassword) {
      return res.status(200).json({ message: 'invalid user password error' });
    }

    const payload = {
      name: user.name,
      userName: user.userName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2m',
    });
    res.status(200).json({ user: { ...payload, token } });
  } catch (err) {
    next(err);
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
