const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const UserModel = new mongoose.Schema({
  fullname: { type: String, required: true , trim: true },
  phone: { type: String, required: true, unique: true, },
  password: { type: String, required: true, minlength: 4, maxlength: 100 },
  isAdmin: { type: String, default: '' },
  CommentPermission: { type: Array ,default: []},
});



UserModel.pre("save",  function (next) {
if (!this.isModified("password")) return next();
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();

  })});


module.exports = mongoose.model("User", UserModel);


