import {gql} from '@apollo/client'

export const ADD_MOVIE = gql`
    mutation AddMovie(
        $title: String!,
        $overview: String!,
        $poster_path: String!,
        $popularity: Float!,
        $tags: [String]
        ) { 
        addMovie (
            title: $title,
            overview: $overview,
            poster_path: $poster_path,
            popularity: $popularity,
            tags: $tags
        ) {
            _id
            title
            overview
            poster_path
            popularity
            tags
            }
        }
    `

export const EDIT_MOVIE = gql`
    mutation EditMovie(
        $id: ID,
        $title: String!,
        $overview: String!,
        $poster_path: String!,
        $popularity: Float!,
        $tags: [String]
        ) { 
        editMovie (
            id: $id,
            title: $title,
            overview: $overview,
            poster_path: $poster_path,
            popularity: $popularity,
            tags: $tags
        ) {
            message
            }
        }
    `