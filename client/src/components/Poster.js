import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Poster(props) {
    const history = useHistory()
    
    function handleDetail () {
        history.push(`/movies/${props.data._id}`)
    }
    return (
        <div>
            <img src={props.data.poster_path}/>
            <p onClick={handleDetail} className="legend btn">{props.data.title}</p>
        </div>
    )
}
