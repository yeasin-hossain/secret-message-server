const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

// eslint-disable-next-line new-cap
const Message = new mongoose.model('message', messageSchema);
module.exports = Message;
