const Message = require('../model/messageSchema');
const { yupMessageSchema } = require('../yupValidation/messageValidation');

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
