const express = require('express');

const router = express.Router();
const { newUser, getUser } = require('../controller/userController');

router.post('/newUser', newUser);
router.get('/userName/:name', getUser);

module.exports = router;
