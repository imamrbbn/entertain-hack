import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import {useQuery, gql, useMutation, refetchQueries} from '@apollo/client'
import {useHistory} from 'react-router-dom'

import {FETCH_MOVIE_DETAIL, FETCH_MOVIES} from '../schemas/fetch'
import {EDIT_MOVIE} from '../schemas/mutation'

export default function Edit() {
    const [title, setTitle] = useState('')
    const [overview, setOverview] = useState('')
    const [poster_path, setPoster_path] = useState('')
    const [popularity, setPopularity] = useState('')
    const [tags, setTags] = useState('')
    const history = useHistory()
    const {type, id } = useParams();
    const {loading : movieLoading, error : movieError, data : movieData} = useQuery(FETCH_MOVIE_DETAIL, { variables: { id } });
    const [editMovie, {}] = useMutation(EDIT_MOVIE, {
			refetchQueries: [{query: FETCH_MOVIES }]
	})
    useEffect(() => {
			!movieLoading && setTitle(movieData.getMovie.title,)
			!movieLoading && setPoster_path(movieData.getMovie.poster_path)
			!movieLoading && setPopularity(+movieData.getMovie.popularity)
			!movieLoading && setOverview(movieData.getMovie.overview)
			!movieLoading && setTags(movieData.getMovie.tags)
      }, [movieData])
 
    
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

    function handleSubmit(event) {
        event.preventDefault()
        editMovie({ variables: {
						id,
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
             <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" required value={title} onChange={inputTitle} className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label >Overview</label>
                    <input type="text" required  value={overview} onChange={inputOverview} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Poster Path</label>
                    <input type="text" required value={ poster_path} onChange={inputPoster} className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="form-group">
                    <label >Popularity</label>
                    <input type="number" value={ popularity } onChange={inputPopularity} className="form-control" />
                </div>
                <div className="form-group">
                    <label >Tags</label>
                    <input type="text" value={tags} onChange={inputTags} className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
