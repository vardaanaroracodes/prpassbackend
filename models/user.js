const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String},
  hallticketno: { type: String, required: true, unique: true },
  parentphone: { type: String, required: true },
  currentyear : { type: String},
  transactionid : { type: String},
  qrcode : { type: String},
  entry : { type: String},
});

module.exports = mongoose.model('User', userSchema,'StudentDatabase');