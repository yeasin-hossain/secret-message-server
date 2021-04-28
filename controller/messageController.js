const Message = require('../model/messageModel');
const { yupMessageSchema } = require('../yupValidation/yupValidation');

module.exports.saveMessage = async (req, res) => {
  const userName = req.params;
  const messageInfo = req.body;
  const messageAndUserId = {
    ...messageInfo,
    ...userName,
  };
  const messageData = new Message(messageAndUserId);

  try {
    console.log(messageAndUserId);
    await yupMessageSchema.validate(messageAndUserId, {
      abortEarly: false,
    });
    const saveMessage = await messageData.save(messageData);
    res.status(200).json(saveMessage);
  } catch (err) {
    res.status(501).json(err);
  }
};

// Get All Message
module.exports.getMessage = async (req, res) => {
  const { userName } = req.params;
  try {
    const allMessages = await Message.find({ userName }).sort({ date: -1 });
    res.json(allMessages);
  } catch (err) {
    console.log(err);
  }
};
