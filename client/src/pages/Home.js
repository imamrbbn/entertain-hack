import React from 'react'
import {useQuery, gql} from '@apollo/client'
import {Link} from "react-router-dom";

// import {FETCH_ALL} from '../schemas/fetch'
import {FETCH_TVSERIES} from '../schemas/fetch'
import {FETCH_MOVIES} from '../schemas/fetch'
import Loading from '../components/Loading'
import MovieCarousel from '../components/MovieCarousel'
import SeriesCarousel from '../components/SeriesCarousel'

export default function Home() {
	const {loading : moviesLoading, error : moviesError, data : moviesData} = useQuery(FETCH_MOVIES)
	const {loading : tvLoading, error : tvError, data : tvData} = useQuery(FETCH_TVSERIES)
    if (moviesLoading || tvLoading) return <Loading/>
    
	if (tvError) return <p>Error {tvError}</p>
    return (
        <div className="mt-3" >
			<div className="d-flex justify-content-between" style={{color: "#112d4e", fontWeight:"bold"}}>
			<div className="col-lg-6 mr-5" style={{height:"70%"}}>

				<div className="row mb-3">
					<h1>MOVIES</h1>
					<button className="btn ml-3" style={{backgroundColor:"#f9f7f7"}}>
						<Link to="/movies/add" style={{color: "#112d4e"}}>Create Movie</Link>
					</button>
				</div>
				<div >
					<MovieCarousel movies={moviesData.getMovies}/>
				</div>
			</div>

				<div className="col-lg-6 ml-5"  style={{maxHeight:"50"}}>			
					<h1 className="mb-4">TV SERIES</h1>
					<SeriesCarousel tvSeries={tvData.getTvSeries}/>
				</div>

			</div>
			</div>
    )
}
