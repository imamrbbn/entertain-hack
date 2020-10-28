import React from 'react'
import {useQuery, gql} from '@apollo/client'
import {Link} from "react-router-dom";

import ContentCard from '../components/ContentCard'
import {FETCH_MOVIES} from '../schemas/fetch'
import Loading from '../components/Loading'

export default function Movies() {
	const {loading, error, data} = useQuery(FETCH_MOVIES)
	
    if (loading) return <Loading/>
    if (error) return <p>Error {error}</p>
	
    return (
        <div >
			<div className="d-flex justify-content-between mt-3" style={{color: "#112d4e", fontWeight:"bold"}}>
				<h1>MOVIES</h1>
				<button className="btn" style={{backgroundColor:"#f9f7f7"}}>
					<Link to="/movies/add"  style={{color: "#112d4e"}}>Create Movie</Link>
					</button>
			</div>
					<div className='row mt-3'>
						{data.getMovies.map((movie, i)=> {
								return (
									<ContentCard
										key={movie._id}
										_id={movie._id}
										title={movie.title}
										overview={movie.overview}
										poster_path={movie.poster_path}
										popularity={movie.popularity}
										tags={movie.tags}
									/>
								)
						})}
						</div>
				</div>
    )
}
