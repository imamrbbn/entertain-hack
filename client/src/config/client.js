import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_LOCAL_FAVORITES } from '../schemas/fetch'

const client = new ApolloClient({
  uri: 'http://54.169.172.62:4000',
  cache: new InMemoryCache()
});

client.writeQuery({
  query: GET_LOCAL_FAVORITES,
  data: {
    Favorites: [],
  },
});

export default client