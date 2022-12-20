const mongoose = require('mongoose');


const IsAdminModel = new mongoose.Schema({
  password: { type: String, minlength: 4, maxlength: 15 },
});


module.exports = mongoose.model("IsAdminModel", IsAdminModel);


