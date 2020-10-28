import React from 'react'
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        
        <nav className="navbar  navbar-expand sticky-top navbar-light"
            style={{backgroundColor:"#112d4e"}}>
            <Link className="navbar-brand" to="/" style={{color: "#FFCB05", fontWeight:"bold"}}>ENTERTAIN-ME!</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/" style={{color: "#f9f7f7"}}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/movies" style={{color: "#f9f7f7"}}>Movies</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tv-series" style={{color: "#f9f7f7"}}>Tv Series</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/favorites" style={{color: "#f9f7f7"}}>Favorites</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
