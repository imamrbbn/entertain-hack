import React from 'react'
import {useQuery, gql} from '@apollo/client'
import {Link} from "react-router-dom";

import SeriesCard from '../components/SeriesCard'
import {FETCH_TVSERIES} from '../schemas/fetch'
import Loading from '../components/Loading'

export default function TvSeries() {
    const {loading, error, data} = useQuery(FETCH_TVSERIES)
    if (loading) return <Loading/>
    if (error) return <p>Error {error}</p>
    return (
			<div className="mt-3" style={{color: "#112d4e", fontWeight:"bold"}}>
				<h1>TV SERIES</h1>
				{/* <button className="btn btn-warning">
					<Link to="/movies/add">Create Movie</Link>
					</button> */}

					<div className='row mt-3'>
					{data.getTvSeries.map((series, i)=> {
								return (
									<SeriesCard 
										key={series._id}
										_id={series._id}
										title={series.title}
										overview={series.overview}
										poster_path={series.poster_path}
										popularity={series.popularity}
										tags={series.tags}
									/>
								)
						})}
						</div>
				</div>
    )
}
