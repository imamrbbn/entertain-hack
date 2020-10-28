import React from 'react'
import { Carousel } from 'react-responsive-carousel';

import Poster from '../components/Poster'
export default function MovieCarousel(props) {
    
    return (
        <Carousel>
            {props.movies.map((movie, i)=> {
                return(
                <Poster key={i} data={movie}/>
                )
			})}
        </Carousel>
    )
}