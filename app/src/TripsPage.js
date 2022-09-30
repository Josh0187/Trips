import React from 'react'
import Nav from './Nav'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

export default function TripsPage() {
  const params = useParams();
  const [trip, setTrip] = useState({});

  // fetch all tripDetails from database
  useEffect( ()=> {
    const getTrip = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/trip/${params.id}`)
        console.log(res.data);
        setTrip(res.data)
      }catch (error) {
        console.log(error);
      }
    }
    getTrip();
  }, [])

  return (
    <>
      <Nav />
      <h2 style={{marginTop: "300px", textAlign: "center", color: "white"}}>Trip id is: {params.id}</h2>
      <h2 style={{marginTop: "10px", textAlign: "center", color: "white"}}>Location: {trip.location}</h2>
      <h2 style={{marginTop: "10px", textAlign: "center", color: "white"}}>Description: {trip.description}</h2>
      <img style={{marginTop: "100px" , marginLeft: "50%"}} src={trip.coverImageURL} alt="cover-image" />
    </>
  )
}
