const mongoose = require('mongoose');

const cashInSchema = new mongoose.Schema({
  details: String,
  category: String,
  mode: String,
  amount: Number,
  type:String,
  date: { type: Date, default: Date.now } // Add a date field
});

module.exports = mongoose.model('CashIn', cashInSchema);
