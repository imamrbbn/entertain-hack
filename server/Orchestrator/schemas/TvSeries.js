const {gql} = require('apollo-server')
const axios = require("axios")
const Redis = require("ioredis");
const redis = new Redis();
let PORT = process.env.PORTTVSERIES || 3003
const tvSeriesUrl = `http://localhost:${PORT}`

const typeDefs = gql`
type TvSeries {
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

extend type Query {
    getTvSeries: [TvSeries]
    findTvSeries(id: ID): TvSeries
}

extend type Mutation {
    addTvSeries(title:String, overview:String, poster_path:String, popularity:Float, tags:[String]) : TvSeries
    editTvSeries(id:ID, title:String, overview:String, poster_path:String, popularity:Float, tags:[String]) : Message
    deleteTvSeries(id:ID): Message
}
`


const resolvers = {
    Query: {
        async getTvSeries() {
            try {
                const seriesChache = JSON.parse(await redis.get("TvSeries"))
                if (seriesChache !== null) {
                    return seriesChache
                }
                else {
                    const {data} = await axios.get(tvSeriesUrl) 
                    await redis.set('TvSeries', JSON.stringify(data))
                    return data
                }

            }
            catch(err) {
                const result = {message: err}
                return result
            }
        },

        async findTvSeries(_, args) {
            try {
                const {data} = await axios.get(`${tvSeriesUrl}/${args.id}`) 
                return data

            }
            catch(err) {
                const result = {message: err}
                return result
            }
        }
    },

    Mutation: {
        async addTvSeries(_, args) {
            try {
                const {data} = await axios.post(tvSeriesUrl, args) 
                // console.log(data,'M<<<<<<<<<<<,,');
                const seriesChache = JSON.parse(await redis.get("TvSeries"))
                if (seriesChache !== null) {
                    seriesChache.push(data)
                    await redis.set('TvSeries', JSON.stringify(seriesChache))
                }
                return data
            }
            catch(err) {
                const result = {message: err}
                return result
            }
        },
        async editTvSeries(_, args) {
            try {
                // console.log(args,'ini argsnya>>>>>>>>>>>>>>>');
                const {data} = await axios.put(`${tvSeriesUrl}/${args.id}`, args)
                // console.log(data,'<<<<<<<<<<<,,,,');
                const result = {message: 'edit success'}
                redis.del("TvSeries")
                return result
            } catch (err) {
                const result = {message: err}
                return result
            }
        },
        async deleteTvSeries(_, args) {
            try {
                const {data} = await axios.delete(`${tvSeriesUrl}/${args.id}`) 
                // console.log(data,'<<<<<<<<<<<,,,,');
                redis.del("TvSeries")
                const result = {message: 'delete success'}
                return result
            } catch (err) {
                const result = {message: err}
                return result
            }
        },
    }
}

module.exports = {
    typeDefs,
    resolvers
}