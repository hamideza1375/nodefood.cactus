const Yup = require("yup");

exports.CommentSchema = Yup.object().shape({
    message: Yup.string().required(),
    allstar: Yup.number().required(),
});

exports.ConfirmPaymentShama = Yup.object().shape({
    floor: Yup.string().required(),
    plaque: Yup.string().required(),
});