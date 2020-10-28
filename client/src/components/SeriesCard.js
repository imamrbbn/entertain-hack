import React from 'react'
import {useHistory} from 'react-router-dom'
import {gql} from '@apollo/client'

import {GET_LOCAL_FAVORITES} from '../schemas/fetch'
import client from '../config/client';

export default function SeriesCard(props) {    
    const id = props._id
    const history = useHistory()

    function handleFavorite () {
        const {Favorites} = client.readQuery({ query: GET_LOCAL_FAVORITES })
        // console.log(props,'masuk ga');
        client.writeQuery({
            query: GET_LOCAL_FAVORITES,
            data: {
              Favorites: Favorites.concat(props),
            },
          });
          
        history.push(`/favorites`)
    }

    return (
        <div className="card col-5 mx-2 my-2" style={{maxHeight:"80vh", backgroundColor:"#f9f7f7"}}>
            <img src={props.poster_path} className="card-img-top mt-2 shadow" style={{width: "auto", height:"40vh"}}/>
            <div className="card-body overflow-auto my-3">
            <h5 className="card-title">{props.title}</h5>
            <div className="row">
            <h6 className=" ml-3 mb-2 text-muted font-italic">Popularity: {props.popularity}</h6>
            {props.tags.map((tag,i) => {
                return (
                    <span key={i} className="badge badge-secondary ml-3">{tag}</span>
                )
            })}
            </div>
            <p className="card-text ">{props.overview}</p>
            
            <button onClick={handleFavorite} className="btn" style={{backgroundColor:"#2AF598"}}>Set Favorite</button>
            </div>
        </div>
    )
}
