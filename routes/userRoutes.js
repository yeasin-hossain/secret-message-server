const express = require('express');

const router = express.Router();
const { newUser, getUser, loginUser } = require('../controller/userController');

router.post('/newUser', newUser);
router.post('/loginUser', loginUser);
router.get('/userName/:name', getUser);

module.exports = router;
