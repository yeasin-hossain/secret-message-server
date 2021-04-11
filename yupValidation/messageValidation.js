const yup = require('yup');

module.exports.yupMessageSchema = yup.object().shape({
  message: yup.string().max(400).required({ error: 'This Felid is required' }),
  userName: yup.string().max(400).required({ error: 'This Felid is required' }),
});
