const cron = require('node-cron')
const isProduction = process.env.NODE_ENV === "production" ? true : false
const IndexerClass = require('./cronFunctions/Indexer/wallet_tx_indexer')
const Indexer = new IndexerClass()

let avaxGasHistory = require('./cronFunctions/History/gas_history_avax')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function (io, cluster) {
    cron.schedule('*/30 * * * * *', () => { //START EVERYDAY AT 00:05
        avaxGasHistory.saveGasPriceAvax()
    })

    async function runIndexer() {
        try {
            await Indexer.index()
        } catch (error) {
            console.log(error)
            await sleep(1000)
            return runIndexer()
        }
        await sleep(1000)
        return runIndexer()
    }
    setTimeout(() => {
        runIndexer()
    }, 2000);
}
