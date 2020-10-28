import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import {useQuery, gql, useMutation} from '@apollo/client'
import {useHistory} from 'react-router-dom'

import {FETCH_MOVIES} from '../schemas/fetch'
import {FETCH_MOVIE_DETAIL} from '../schemas/fetch'
import {GET_LOCAL_FAVORITES} from '../schemas/fetch'
import client from '../config/client';

const DELETE_MOVIE = gql`
    mutation DeleteMovie ($id: ID!) { 
        deleteMovie (id: $id) {
            message
        }
    }
`

export default function Detail() {
    const history = useHistory()
    const {type, id } = useParams();

    const {loading : movieLoading, error : movieError, data : movieData} = useQuery(FETCH_MOVIE_DETAIL, { variables: { id } });
    const [deleteMovie, {data: deleteData, loading : loadingData, error : loadingError}] = useMutation(DELETE_MOVIE,{
        refetchQueries: [{query: FETCH_MOVIES }]
    })
    // const {loading : favoriteLoading, favoritError, data: favoriteData} = useQuery(GET_LOCAL_FAVORITES)
    const {Favorites} = client.readQuery({ query: GET_LOCAL_FAVORITES })

    if (movieLoading) return <p>Loading...</p>
    if (movieError) return <p>Error {movieError}</p>

    const {_id, overview, popularity, poster_path, tags, title} = movieData.getMovie

    // Favorites.forEach(favorite => {
    //     favorite._id === _id ? setIsFavorite(true) : setIsFavorite(false) 
    // })
    // console.log(isFavorite,'<<<<<<')
    
    function isFavorite() {
        const favids = Favorites.map(favorite => favorite._id )
        console.log('tesstttt');
        console.log(favids,_id,'<<<<<<<<');
        return favids.includes(_id)
    }

    function handleDelete () {
        deleteMovie({ variables: {
            id: _id
        }})
        history.push('/movies')
    }

    function handleEdit () {
        history.push(`/movies/${_id}/edit`)
    }

    function handleFavorite () {
        const movie = movieData.getMovie
        const {Favorites} = client.readQuery({ query: GET_LOCAL_FAVORITES })
        client.writeQuery({
            query: GET_LOCAL_FAVORITES,
            data: {
              Favorites: Favorites.concat(movie),
            },
          });
        history.push(`/favorites`)
    }

    return (
        <div  style={{height:"100vh"}} className="mt-5">
        <div className="card mb-3 shadow-lg" style={{maxWidth: "540px"}}>
         <div className="row no-gutters">
             <div className="col-md-4">
             <img src={poster_path} className="card-img  mx-2 my-2 shadow" alt="pokemon"/>
             </div>
             <div className="col-md-8">
             <div className="card-body">
                 <h5 className="card-title">{title}</h5>
                 <p className="card-text"><small className="text-muted">Type: {popularity} | Weight : {tags}</small></p>
                 <p className="card-text">{overview}</p>
                <button onClick={handleEdit} className="btn btn-warning " >Edit</button>
                <button onClick={handleDelete} className="btn btn-danger mx-3" >Delete</button>

                <button onClick={handleFavorite} hidden={isFavorite()} className="btn btn-primary" >Favorite</button>
             </div>
             </div>
         </div>
         </div>
     </div>
    )
}
