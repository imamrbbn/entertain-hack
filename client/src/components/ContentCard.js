import React from 'react'
import {gql} from '@apollo/client'
import {useHistory} from 'react-router-dom'


export default function ContentCard(props) {    
    const id = props._id
    const history = useHistory()


    
    function handleDetail () {
        history.push(`/movies/${id}`)
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
            
            <button onClick={handleDetail} className="btn" style={{backgroundColor:"#2AF598"}}>More Detail</button>
            </div>
        </div>
    )
}
