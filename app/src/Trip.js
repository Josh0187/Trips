import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default function Trip(props) {

  const getDateString = (date) => {
    const startDate = new Date(date);
    return startDate.toLocaleDateString();
  }

  return (
    <div className='trips-card'>
        <div className="trips-card-img" style={{backgroundImage: `url(${props.coverImageURL})`}}/>
        <h2 className='trips-card-lg-text'>{props.location}</h2>
        <p className='trips-card-sm-text'>{props.description}</p>
        <p className="trips-card-sm-text">{getDateString(props.startDate)} to {getDateString(props.endDate)}</p>
        <div className="trips-card-buttons">
          <Link className="trips-card-view-button" to={"/trips/" + props.id}>View</Link>
          <a href="" className="trips-card-delete-button" onClick={(e) => props.handleDeleteTrip(e, props.id, props.coverImagePath)}>Remove</a>
        </div>
    </div>
  )
}
