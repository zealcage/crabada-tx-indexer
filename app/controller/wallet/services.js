const resultHandler = require('../resultHandler')
const WalletClass = require('./Wallet')
const WalletController = new WalletClass()

exports.getFees = (req, res) => {
    WalletController.getFees().then(result => {
        return resultHandler(req, res, result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            "description": "Error",
            "error": "Error occured"
        });
    })
}