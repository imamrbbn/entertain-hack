import React from 'react'
import { Carousel } from 'react-responsive-carousel';

export default function SeriesCarousel(props) {
    return (
        <Carousel infiniteLoop={true} >
            {props.tvSeries.map((series, i)=> {
                return(
                <div key={i}>
                    <img src={series.poster_path}/>
                    <p className="legend">{series.title}</p>
                </div>
                )
			})}
        </Carousel>
    )
}