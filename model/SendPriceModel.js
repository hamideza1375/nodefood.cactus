const mongoose = require('mongoose');

const SendPriceModel = new mongoose.Schema({
  sendPrice: {type:Number,required: true,default:23000}
});

module.exports = mongoose.model("SendPriceModel", SendPriceModel);


