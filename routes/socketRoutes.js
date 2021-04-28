const express = require('express');
const { socketServer } = require('../controller/socketController');

const router = express.Router();

router.get('/', socketServer);
module.exports = router;
