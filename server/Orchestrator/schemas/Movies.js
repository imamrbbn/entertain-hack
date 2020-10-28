const {gql} = require('apollo-server')
const axios = require("axios")
const Redis = require("ioredis");
const redis = new Redis();
let PORT = process.env.PORTMOVIE || 3001
const movieUrl = `http://localhost:${PORT}`

const typeDefs = gql`
type Movie {
    _id: ID!
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
}

extend type Query {
    getMovies: [Movie]
    getMovie(id: ID): Movie
}

extend type Mutation {
    addMovie(title:String, overview:String, poster_path:String, popularity:Float, tags:[String]) : Movie
    editMovie(id:ID, title:String, overview:String, poster_path:String, popularity:Float, tags:[String]) : Message
    deleteMovie(id:ID): Message
}
`

// input inputMovie {
//     title: String
//     overview: String
//     poster_path: String
//     popularity: Float
//     tags: [String]
// }

// input inputEditedMovie {
//     id: ID
//     title:String
//     overview:String
//     poster_path:String
//     popularity:Float
//     tags:[String]
// }

// extend type Mutation {
//     addMovie(movie: inputMovie) : Movie
//     editMovie(movie: inputEditedMovie) : Message
//     deleteMovie(id:ID): Message
// }


const resolvers = {
    Query: {
        async getMovies() {
            try {
                const moviesCache = JSON.parse(await redis.get("Movies"))
                if (moviesCache !== null) {
                    return  moviesCache
                }
                else {
                    const {data} = await axios.get(movieUrl) 
                    await redis.set('Movies', JSON.stringify(data))
                    return data
                }
            }
            catch(err) {
                const result = {message: err}
                return result
            }
        },
        async getMovie(_, args) {
            try {
                const {data} = await axios.get(`${movieUrl}/${args.id}`) 
                return data
            }
            catch(err) {
                const result = {message: err}
                return result
            }
        },
    },

    Mutation: {
        async addMovie(_, args) {
            try {
                const {data} = await axios.post(movieUrl, args) 
                // console.log(data,'M<<<<<<<<<<<,,');
                const moviesCache = JSON.parse(await redis.get("Movies"))
                if (moviesCache !== null) {
                    moviesCache.push(data)
                    await redis.set('Movies', JSON.stringify(moviesCache))
                }
                return data
            }
            catch(err) {
                const result = {message: err}
                return result
            }
        },
        async editMovie(_, args) {
            try {
                // console.log(args,'ini argsnya>>>>>>>>>>>>>>>');
                const {data} = await axios.put(`${movieUrl}/${args.id}`, args)
                // console.log(data,'<<<<<<<<<<<,,,,');
                redis.del("Movies")
                
                const result = {message: 'edit success'}
                return result
            } catch (err) {
                const result = {message: err}
                return result
            }
        },
        async deleteMovie(_, args) {
            try {
                const {data} = await axios.delete(`${movieUrl}/${args.id}`) 
                redis.del("Movies")
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