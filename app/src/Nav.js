import React from 'react'
import {Link} from 'react-router-dom'

import './index.css'
export default function Nav(props) {
  return (
    <div>
        <ul className="nav">
            <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to='/create-trip'>Create Trip</Link></li>
            <li className="nav-item-logout"><div className="nav-link-logout" id="logout">Log out</div></li>
        </ul> 
    </div>
  )
}
