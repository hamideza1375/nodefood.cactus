const Yup = require("yup");



exports.SendPhoneSchema = Yup.object().shape({
    phone: Yup.string().min(11).max(11).required(),
});

exports.RegisterVerifyCodeSchema = Yup.object().shape({
    phone: Yup.string().min(11).max(11).required(),

    fullname: Yup.string().required().min(3).max(50),
 
    password: Yup.string().min(4).max(12).required(),

    code: Yup.string().required(),
});


exports.LoginSchama = Yup.object().shape({
    phone: Yup.string().min(11).max(11).required(),
 
    password: Yup.string().min(4).max(12).required(),
});


exports.ResetPasswordSchama = Yup.object().shape({
    password: Yup.string().min(4).max(12).required(),

    repeatPassword: Yup.string().required().oneOf([Yup.ref("password"), null]),
});


exports.SendCodeSchema = Yup.object().shape({
    code: Yup.string().min(11).max(11).required(),
});
