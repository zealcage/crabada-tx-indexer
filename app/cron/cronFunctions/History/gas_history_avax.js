const moment = require("moment")
const axios = require("axios")
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL))
let GasHistoryAvaxModel = require('../../../mongodbModel/gas_history.model');

async function getAvaxGasPrice() {
    try {
        const gas_price = await web3.eth.getGasPrice()
        return gas_price
    } catch (error) {
        console.log(error)
    }
}
async function getAvaxPrice() {
    try {
        const price = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd`, {}, { timeout: 2000 })
        return price.data["avalanche-2"].usd
    } catch (error) {
        console.log(error)
    }
}
exports.saveGasPriceAvax = async () => {
    try {
        let gas_price = null
        let avaxPrice = null
        let tryCount = 0
        do {
            gas_price = await getAvaxGasPrice()
        } while (!gas_price && tryCount < 5);
        tryCount = 0
        do {
            avaxPrice = await getAvaxPrice()
        } while (!avaxPrice && tryCount < 5);
        console.log("gas price: " + Number(gas_price) / 1000000000)
        GasHistoryAvaxModel.create({ gasPrice: gas_price, price:avaxPrice })
    } catch (error) {
        console.log(error)
    }

}