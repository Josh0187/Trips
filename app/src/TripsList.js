import React from 'react'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Trip from './Trip'
import axios from 'axios'
import './index.css'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getStorage, ref, deleteObject } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEEiD0VghzoGrMcMhbuzQU0YVm36fQlZw",
    authDomain: "mytrips-cd2f1.firebaseapp.com",
    databaseURL: "https://mytrips-cd2f1-default-rtdb.firebaseio.com/",
    projectId: "mytrips-cd2f1",
    storageBucket: "mytrips-cd2f1.appspot.com",
    messagingSenderId: "307722914318",
    appId: "1:307722914318:web:60f21b6bd07e4868088a5f",
    measurementId: "G-MXEW6P446J"
};

const app = initializeApp(firebaseConfig);
var storage = getStorage();

export default function TripsList() {

  const [tripsList, setTripsList] = useState([]);
  // fetch all tripDetails items from database
  useEffect( ()=> {
    const getTrips = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trips")
        console.log(res.data);
        setTripsList(res.data);
      }catch (error) {
        console.log(error);
      }
    }
    getTrips();
  }, [])

  const deleteFirebaseImage = async (imagePath) => {
    const imageRef = ref(storage, imagePath);
    deleteObject(imageRef).then(()=> {
      console.log("Image deleted successfully");
    }). catch((error)=> {
      console.log(`Error deleting image: ${error.message}`);
    })

  }

  const deleteTrip = async (e, tripId, imagePath) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/trip/${tripId}`);
      deleteFirebaseImage(imagePath);
      console.log(res);
      const newTripsList = tripsList.filter(trip => trip._id !== tripId);
      setTripsList(newTripsList);
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <>
      <div className='trips'>
        {
          tripsList.map(trip => (
              <Trip 
                key={trip._id} 
                id={trip._id} 
                location={trip.location} 
                description={trip.description} 
                startDate={trip.startDate} 
                endDate={trip.endDate}
                coverImagePath={trip.coverImagePath}
                coverImageURL={trip.coverImageURL}
                handleDeleteTrip= {deleteTrip}
              />
            )
          )
        }
      </div>
      <Link className="add-trip-button" to='/create-trip'>Add Trip</Link>
    </>
  )
}
