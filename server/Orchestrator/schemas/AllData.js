const {gql} = require('apollo-server')
const axios = require("axios")
const Redis = require("ioredis");
const redis = new Redis();
let PORTMOVIE = process.env.PORTMOVIE || 3001
let PORTTVSERIES = process.env.PORTTVSERIES || 3003
const movieUrl = `http://localhost:${PORTMOVIE}`
const tvSeriesUrl = `http://localhost:${PORTTVSERIES}`


const typeDefs = gql`
type AllData {
    Movies: [Movie]
    TvSeries: [TvSeries]
}

extend type Query {
    getAllData: AllData
}
`


const resolvers = {
    Query: {
        async getAllData() {
            try {
                const allDataCache = JSON.parse(await redis.get("AllData"))
                // console.log(allDataCache);
                // console.log('ada ga ', allDataCache);
                if (allDataCache !== null) {
                    return  allDataCache
                }
                else {
                    const movies = await axios.get(movieUrl)
                    const tvSeries = await axios.get(tvSeriesUrl)
                    const allDataCache = {
                        Movies: movies.data, 
                        TvSeries: tvSeries.data
                    }
                    // console.log('success', allDataCache);
                    await redis.set('AllData', JSON.stringify(allDataCache))
                    return allDataCache
                }
            }
            catch(err) {
                const result = {message: err}
                return result
            }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}