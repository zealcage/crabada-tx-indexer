let mongoose = require('mongoose')

let analyzerSchema = new mongoose.Schema({
    latestBlock: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('wallet_analyzer', analyzerSchema)