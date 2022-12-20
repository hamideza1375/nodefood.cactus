const mongoose = require('mongoose');

const proposalModel = new mongoose.Schema({
  message: String
});

module.exports = mongoose.model("Proposal", proposalModel);