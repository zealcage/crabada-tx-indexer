const resultHandler = require('../resultHandler')
const MineClass = require('./Mine')
const MineController = new MineClass()

exports.getCheapestThreeCrabs = (req, res) => {
    MineController.getCheapestThreeCrabs().then(result => {
        return resultHandler(req, res, result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            "description": "Error",
            "error": "Error occured"
        });
    })
}

exports.getCheapestTwoCrabsAndPrime = (req, res) => {
    MineController.getCheapestTwoCrabsAndPrime().then(result => {
        return resultHandler(req, res, result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            "description": "Error",
            "error": "Error occured"
        });
    })
}

exports.getPrimeAndTwoHighMP = (req, res) => {
    MineController.getPrimeAndTwoHighMP().then(result => {
        return resultHandler(req, res, result)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            "description": "Error",
            "error": "Error occured"
        });
    })
}