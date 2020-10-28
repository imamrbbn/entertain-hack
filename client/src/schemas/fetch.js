import {gql} from '@apollo/client'

export const FETCH_ALL = gql`
    query GetAll {
        getAllData {
            Movies {
                _id
                title
                overview
                poster_path
                popularity
                tags
            }
            TvSeries {
                _id
                title
                overview
                poster_path
                popularity
                tags
            }
          }
    }

`

export const FETCH_MOVIES = gql`
    query GetMovies {
        getMovies {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const FETCH_TVSERIES = gql`
    query GetTvSeries {
        getTvSeries {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }

`
export const FETCH_MOVIE_DETAIL = gql`
    query GetMovie($id: ID) {
        getMovie(id: $id) {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
`

export const GET_LOCAL_FAVORITES = gql`
    query {
        Favorites  {
            _id
            title
            overview
            poster_path
            popularity
            tags
        }
    }
` 