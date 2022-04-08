const moment = require('moment')
const axios = require('axios')

class MineController {
    // Constructor
    constructor() {
    }

    async getCheapestThreeCrabs() {
        const res = await axios.get(`https://api.crabada.com/public/crabada/selling?limit=3&page=1&from_breed_count=0&to_breed_count=5&from_legend=0&to_legend=6&from_pure=0&to_pure=6&from_price=0&to_price=2e%2B25&stage=1&orderBy=price&order=asc`, {}, { timeout: 2000 })
        console.log(res.data)
        return { status: "success", data: res.data.result.data }
    }

    async getCheapestTwoCrabsAndPrime() {
        const cheapestPrime = await axios.get(`https://api.crabada.com/public/crabada/selling?limit=1&page=1&from_breed_count=0&to_breed_count=5&from_legend=0&to_legend=6&from_pure=0&to_pure=6&from_price=0&to_price=2e%2B25&stage=1&class_ids[]=3&orderBy=price&order=asc`, {}, { timeout: 2000 })
        const cheapest2Crabs = await axios.get(`https://api.crabada.com/public/crabada/selling?limit=2&page=1&from_breed_count=0&to_breed_count=5&from_legend=0&to_legend=6&from_pure=0&to_pure=6&from_price=0&to_price=2e%2B25&stage=1&orderBy=price&order=asc`, {}, { timeout: 2000 })
        return { status: "success", data: [...cheapestPrime.data.result.data, ...cheapest2Crabs.data.result.data] }
    }

    async getPrimeAndTwoHighMP() {
        const cheapestPrime = await axios.get(`https://api.crabada.com/public/crabada/selling?limit=1&page=1&from_breed_count=0&to_breed_count=5&from_legend=0&to_legend=6&from_pure=0&to_pure=6&from_price=0&to_price=2e%2B25&stage=1&class_ids[]=3&orderBy=price&order=asc`, {}, { timeout: 2000 })
        const cheapest2Crabs = await axios.get(`https://api.crabada.com/public/crabada/selling?limit=2&page=1&from_breed_count=0&to_breed_count=5&from_legend=0&to_legend=6&from_pure=0&to_pure=6&from_price=0&to_price=2e%2B25&stage=1&orderBy=price&order=asc`, {}, { timeout: 2000 })
        console.log(res.data)
        return { status: "success", data: { ...cheapest2Crabs.data.result, data: [...cheapest2Crabs.data.result.data, ...cheapestPrime.data.result.data] } }
    }
}

module.exports = MineController;