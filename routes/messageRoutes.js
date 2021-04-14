const express = require('express');

const router = express.Router();
const { saveMessage, getMessage } = require('../controller/messageController');

router.post('/:userName', saveMessage);
router.get('/:userName', getMessage);

module.exports = router;
