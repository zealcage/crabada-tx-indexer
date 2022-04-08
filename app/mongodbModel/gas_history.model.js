let mongoose = require('mongoose')

let gasHistorySchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    gasPrice: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    }
})

gasHistorySchema.index({ "time": -1 });

module.exports = mongoose.model('gas_history', gasHistorySchema)