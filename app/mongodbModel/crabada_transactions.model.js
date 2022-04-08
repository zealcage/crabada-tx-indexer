let mongoose = require('mongoose')

let transactionsSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
        index: true
    },
    to: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
        index: true
    },
    blockNumber: {
        type: Number,
        required: true,
        index: true
    },
    gameId: {
        type: Number,
        index: true
    },
    crab: {
        type: Number,
        index: true
    },
    success: {
        type: Boolean,
        index: true
    },
    attackerTeamId: {
        type: Number,
        index: true
    },
    minerTeamId: {
        type: Number,
        index: true
    },
    time: {
        type: Date,
        default: Date.now,
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },

    win: {
        type: Boolean,
    },
    input: {
        type: String,
    },
    blockHash: {
        type: String,
    },
    receipt: {},
    effectiveGasPrice: {
        type: Number,
        required: true,
    },
    gasUsed: {
        type: Number,
        required: true,
    },
    payedForGasUSD: {
        type: Number,
        required: true,
    }
})

transactionsSchema.index({
    "from": 1,
    "method": -1,
});

transactionsSchema.index({
    "from": 1,
    "method": -1,
    "success": -1,
});

transactionsSchema.index({
    "from": 1,
    "method": -1,
    "success": -1,
    "win": -1,
});

transactionsSchema.index({
    "from": 1,
    "method": -1,
    "minerTeamId": -1,
});
transactionsSchema.index({
    "from": 1,
    "method": -1,
    "attackerTeamId": -1,
});

transactionsSchema.index({
    "time": -1,
});

module.exports = mongoose.model('crabada_transactions', transactionsSchema)