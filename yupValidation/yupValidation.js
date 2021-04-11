const yup = require('yup');

module.exports.yupMessageSchema = yup.object().shape({
  message: yup.string().max(400).required({ error: 'This Felid is required' }),
  userName: yup.string().required({ error: 'This Felid is required' }),
});

module.exports.yupUserSchema = yup.object().shape({
  userName: yup.string().trim().min(5).max(25).required({ error: 'This Felid is required' }),
  password: yup
    .string()
    .min(6)
    .max(200)
    .matches(/[^A-Za-z0-9]/)
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .required({ error: 'This Felid is required' }),
});
