const { ApolloServer, gql, makeExecutableSchema  } = require('apollo-server');
require('dotenv').config()
const tvSeriesSchema = require('./schemas/TvSeries')
const moviesSchema = require('./schemas/Movies')
const allDataSchema = require('./schemas/AllData')

const typeDefs = gql`
  type Query
  type Mutation

  type Message {
    message: String
}
`

const schema = makeExecutableSchema ({
    typeDefs: [typeDefs, tvSeriesSchema.typeDefs, moviesSchema.typeDefs, allDataSchema.typeDefs],
    resolvers: [tvSeriesSchema.resolvers, moviesSchema.resolvers, allDataSchema.resolvers]
  })


const server = new ApolloServer({schema});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});