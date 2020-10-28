import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import {useMutation, gql, refetchQueries} from '@apollo/client'

import {FETCH_MOVIES} from '../schemas/fetch'
import {ADD_MOVIE} from '../schemas/mutation'

// const ADD_MOVIE = gql`
//     mutation AddMovie(
//         $title: String!,
//         $overview: String!,
//         $poster_path: String!,
//         $popularity: Float!,
//         $tags: [String]
//         ) { 
//         addMovie (
//             title: $title,
//             overview: $overview,
//             poster_path: $poster_path,
//             popularity: $popularity,
//             tags: $tags
//         ) {
//             _id
//             title
//             overview
//             poster_path
//             popularity
//             tags
//             }
//         }
//     `

export default function AddMovie() {
    
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState('')
    const history = useHistory()
    const [addMovie, {data, loading, error}] = useMutation(ADD_MOVIE, {
        refetchQueries: [{query: FETCH_MOVIES }]
    })


    function inputTitle(event) {
        setTitle(event.target.value)
    }

    function inputPoster(event) {
        setPoster_path(event.target.value)
    }

    function inputPopularity(event) {
        setPopularity(+event.target.value)
    }

    function inputOverview(event) {
        setOverview(event.target.value)
    }

    function inputTags(event) {
        const tempTag = [event.target.value]
        setTags(tempTag)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addMovie({ variables: {
            title,
            overview,
            poster_path,
            popularity,
            tags
        }})
        history.push('/movies')
    }

    return (
        <div>
             <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" required onChange={inputTitle} className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label >Overview</label>
                    <input type="text" required onChange={inputOverview} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Poster Path</label>
                    <input type="text" required onChange={inputPoster} className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label >Popularity</label>
                    <input type="text" onChange={inputPopularity} className="form-control" />
                </div>
                <div className="form-group">
                    <label >Tags</label>
                    <input type="text" onChange={inputTags} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
