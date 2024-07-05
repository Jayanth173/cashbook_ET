const mongoose = require('mongoose')

const ChashOutSchema  =  mongoose.Schema({
    details: String,
    category: String,
    mode: String,
    amount: Number,
    type:String,
    date: { type: Date, default: Date.now } 

})

const CashOut  =  mongoose.model("CashOut",ChashOutSchema)
module.exports = CashOut