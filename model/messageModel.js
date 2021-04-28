const mongoose = require('mongoose');
const moment = require('moment');

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
  },
});

// eslint-disable-next-line new-cap
const Message = new mongoose.model('message', messageSchema);
module.exports = Message;
