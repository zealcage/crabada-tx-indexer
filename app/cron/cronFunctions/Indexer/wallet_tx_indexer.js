const moment = require('moment')
const axios = require('axios')
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_URL))
let WalletAnalyzer = require('../../../mongodbModel/wallet_analyzer.model');
let CrabadaTransactions = require('../../../mongodbModel/crabada_transactions.model');
let AvaxPrice = require('../../../mongodbModel/gas_history.model');

class IndexerController {
    // Constructor
    constructor() {
    }

    async index() {
        var myAddr = '0x82a85407BD612f52577909F4A58bfC6873f14DA8';
        let currentBlock = await web3.eth.getBlockNumber();
        //const logs = await getAccountTransactions(myAddr, currentBlock + 10, currentBlock + 10)
        //var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
        //var bal = await web3.eth.getBalance(myAddr, currentBlock);
        //console.log("Balance: " + parseFloat(web3.utils.fromWei(bal)))

        let avaxPrice = await AvaxPrice.findOne().sort({ "createdAt": -1 }).lean()

        const wallet = await WalletAnalyzer.findOne({ description: "crabada" })
        if (!wallet) return console.log("wallet not found")
        if (currentBlock === wallet.latestBlock)
            return

        let untilBlock = wallet.latestBlock + 10 <= currentBlock ? wallet.latestBlock + 10 : currentBlock
        while (untilBlock < currentBlock) {
            avaxPrice = await AvaxPrice.findOne().sort({ "createdAt": -1 }).lean()
            try {
                console.log("Latest Indexed Block: " + (untilBlock - 10) + " | Current Block: " + currentBlock + " Diff: " + (currentBlock - wallet.latestBlock))
                console.log("-------")
                const logs = await getAccountTransactions(myAddr, wallet.latestBlock + 1, untilBlock, avaxPrice.price)
                await CrabadaTransactions.insertMany(logs)
                await WalletAnalyzer.updateOne({ description: "crabada" }, { latestBlock: untilBlock })
                currentBlock = await web3.eth.getBlockNumber();
                wallet.latestBlock = untilBlock
                untilBlock = untilBlock + 10 <= currentBlock ? untilBlock + 10 : currentBlock
            } catch (error) {
                console.log(error)
            }
        }


        return { status: "success", data: "" }
    }
}

async function getAccountTransactions(accAddress, startBlockNumber, endBlockNumber, avaxPrice) {
    console.log("Within blocks " + startBlockNumber + " and " + endBlockNumber);
    let preparedLogs = []
    for (var i = startBlockNumber; i <= endBlockNumber; i++) {
        var block = await web3.eth.getBlock(i, true);

        if (block != null && block.transactions != null) {
            for (let index = 0; index < block.transactions.length; index++) {
                const e = block.transactions[index];
                if (accAddress == "*" || accAddress == e.from || accAddress == e.to) {
                    let receipt = await web3.eth.getTransactionReceipt(e.hash)
                    e.receipt = receipt
                    e.avaxPrice = avaxPrice
                    try {
                        e.payedForGasUSD = parseFloat(web3.utils.fromWei((receipt.effectiveGasPrice * receipt.gasUsed).toString())) * avaxPrice
                        e.effectiveGasPrice = receipt.effectiveGasPrice
                        e.gasUsed = receipt.gasUsed
                        if (e.input.substring(0, 10) === "0x312d7bbc") {
                            e.method = "settle"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.winTUS = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                                e.winCRA = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[1].data, 16)).toString()))
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[3].data)
                                e.gameId = decodedParams[0]
                                e.attackerTeamId = decodedParams[1]
                                if (e.winTUS > 200)
                                    e.win = true
                                else
                                    e.win = false
                            }

                        }
                        else if (e.input.substring(0, 10) === "0x77728f25") {
                            e.method = "attack"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                e.gameId = decodedParams[0]
                                e.attackerTeamId = decodedParams[2]
                                e.minerTeamId = decodedParams[3]
                                e.crab = decodedParams[4]
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x3dc8d5ce") {
                            e.method = "reinforceAttack"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                if (receipt.logs.length === 1) {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                    e.gameId = decodedParams[0]
                                    e.attackerTeamId = decodedParams[2]
                                    e.minerTeamId = decodedParams[3]
                                    e.crab = decodedParams[4]
                                    e.reinforcementFee = 0
                                } else {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[5].data)
                                    e.gameId = decodedParams[0]
                                    e.attackerTeamId = decodedParams[2]
                                    e.minerTeamId = decodedParams[3]
                                    e.crab = decodedParams[4]
                                    e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                        parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                                }
                            }
                        }
                        else if (e.input.substring(0, 10) === "0xe5ed1d59") {
                            e.method = "startGame"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                e.gameId = decodedParams[0]
                                e.minerTeamId = decodedParams[1]
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x2d6ef310") {
                            e.method = "closeGame"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                if (receipt.logs.length === 3) {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256'], receipt.logs[2].data)
                                    e.gameId = decodedParams[0]
                                    e.winTUS = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[1].data, 16)).toString()))
                                    e.winCRA = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString()))
                                } else {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256','uint256','uint256','uint256','uint256','uint256'], receipt.logs[3].data)
                                    e.gameId = decodedParams[0]
                                    e.minerTeamId = decodedParams[1]
                                    e.winTUS = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                                    e.winCRA = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[1].data, 16)).toString()))
                                }
                                if (e.winTUS > 200)
                                    e.win = true
                                else
                                    e.win = false
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x08873bfb") {
                            e.method = "reinforceDefense"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                if (receipt.logs.length === 1) {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                    e.gameId = decodedParams[0]
                                    e.attackerTeamId = decodedParams[2]
                                    e.minerTeamId = decodedParams[3]
                                    e.crab = decodedParams[4]
                                    e.reinforcementFee = 0
                                } else {
                                    let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[5].data)
                                    e.gameId = decodedParams[0]
                                    e.attackerTeamId = decodedParams[2]
                                    e.minerTeamId = decodedParams[3]
                                    e.crab = decodedParams[4]
                                    e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                        parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                                }
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x31c1bf82") {
                            e.method = "removeCrabadaFromTeam"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                e.teamId = decodedParams[0]
                                e.crab = decodedParams[2]
                                // e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                //     parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                            }
                        }
                        else if (e.input.substring(0, 10) === "0xa9686101") {
                            e.method = "setLendingPrice"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256'], receipt.logs[0].data)
                                e.crab = decodedParams[0]
                                e.lendingPrice = parseFloat(web3.utils.fromWei(web3.eth.abi.decodeParameters(['uint256', 'uint256'], receipt.logs[0].data)[1]))
                                // e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                //     parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                            }
                        }
                        else if (e.input.substring(0, 10) === "0xc0d8080c") {
                            e.method = "addCrabadaToTeam"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'uint256'], receipt.logs[0].data)
                                e.teamId = decodedParams[0]
                                e.crab = decodedParams[2]
                                // e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                //     parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x8293744b") {
                            e.method = "withdraw"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256'], receipt.logs[2].data)
                                e.crab = decodedParams[0]
                                // e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                //     parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                            }
                        }
                        else if (e.input.substring(0, 10) === "0x598b8e71") {
                            e.method = "deposit"
                            if (receipt.logs.length === 0)
                                e.success = false
                            else {
                                e.success = true
                                let decodedParams = web3.eth.abi.decodeParameters(['uint256', 'uint256'], receipt.logs[2].data)
                                e.crab = decodedParams[0]
                                // e.reinforcementFee = parseFloat(web3.utils.fromWei((parseInt(receipt.logs[0].data, 16)).toString())) +
                                //     parseFloat(web3.utils.fromWei((parseInt(receipt.logs[2].data, 16)).toString()))
                            }
                        }
                        else
                            e.method = "unknown"
                    } catch (error) {
                        console.log("Substring error")
                    }
                    preparedLogs.push(e)
                }
            }
        }
    }
    return preparedLogs
}

module.exports = IndexerController;