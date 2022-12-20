const mongoose = require("mongoose")


const imageProfile = new mongoose.Schema({
    uri: String,
    user: { type : mongoose.Schema.Types.ObjectId, ref : "profile" },
})


exports.imageProfile = mongoose.model('imageProfile', imageProfile)
