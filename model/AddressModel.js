const mongoose = require('mongoose');


const Address = new mongoose.Schema({
  fullname: String,
  phone: Number,
  floor: Number,
  plaque: Number,
  formattedAddress: String,
  streetName:String,
  origin:Object,
  price:Number,
  enablePayment:Number,
  foodTitle:Array,
  description:String,
  id: { type: Number, default:1 },
  createdAt: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
  del: { type: mongoose.Schema.Types.ObjectId, ref: "delete" },
});



module.exports = mongoose.model('address', Address);;
