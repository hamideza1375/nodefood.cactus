const mongoose = require('mongoose');



const notifee = new mongoose.Schema({
    title: {type:String, default:''},
    message: {type:String, default:''},
  });



module.exports = mongoose.model("notifee", notifee);


