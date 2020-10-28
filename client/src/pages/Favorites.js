import React from 'react'
import {useQuery, gql} from '@apollo/client'

import ContentCard from '../components/ContentCard'
import {GET_LOCAL_FAVORITES} from '../schemas/fetch'

function Favorites() {
    // console.log('favorites' ,favorites);
    const {loading, error, data} = useQuery(GET_LOCAL_FAVORITES)
    console.log(data);
    return(
        <div  style={{height:"100vh"}} className="mx-3" >
            {/* {JSON.stringify(data.Favorites)} */}
            <h1 style={{color: "#112d4e", fontWeight:"bold"}}>FAVORITES</h1>
            <div className='row'>
                {data.Favorites.map((favorite, i)=> {
                        return (
                            <ContentCard 
                                key={favorite._id}
                                _id={favorite._id}
                                title={favorite.title}
                                overview={favorite.overview}
                                poster_path={favorite.poster_path}
                                popularity={favorite.popularity}
                                tags={favorite.tags}
                            />
                        )
                })}
            </div>
        </div>
    )
}

export default Favorites
