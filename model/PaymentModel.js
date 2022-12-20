const mongoose = require('mongoose');




const Payment = new mongoose.Schema({
  phone : String ,
  fullname: String,
  price : Number,
  title: String,
  paymentCode : String,
  refId : String,
  floor: Number,
  plaque: Number,
  formattedAddress: String,
  streetName:String,
  origin:{type:Object},
  foods:{type:Array},
  success: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  user: { type : mongoose.Schema.Types.ObjectId, ref : "user" },
});



module.exports = mongoose.model('payment', Payment);;

