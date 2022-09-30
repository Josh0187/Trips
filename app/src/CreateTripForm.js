import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import FileBase64 from 'react-file-base64'
import {ref as sref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

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

export default function CreateTripForm() {
    const [tripLocation, setLocationText] = useState('');
    const [tripDescription, setDescriptionText] = useState('');
    const [tripStartDate, setStartDate] = useState('');
    const [tripEndDate, setEndDate] = useState('');
    const [tripCoverImage, setCoverImage] = useState('');

    function uploadFile(storageRef, file) {
        return new Promise(resolve => {
            uploadBytes(storageRef, file).then((snapshot) => {
                resolve("upload successful");
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });
    }
    
    // add new trip to database
    const addTrip = async (e) => {
        e.preventDefault();
        try {
            // upload image and save url
            const CoverImage = document.getElementById('cover-image').files[0];
            const type = CoverImage.type;
            const tripCoverImagePath = `cover_images/cover_image_${Date.now()}.${type.replace("image/", "")}`;
            const storageRef = sref(storage, tripCoverImagePath);
            await uploadFile(storageRef, CoverImage);
            const tripCoverImageURL = await getDownloadURL(storageRef);
               
            const res = await axios.post('http://localhost:5000/api/trip', { 
                location: tripLocation, 
                description: tripDescription, 
                startDate: tripStartDate, 
                endDate:tripEndDate, 
                coverImageURL: tripCoverImageURL,
                coverImagePath: tripCoverImagePath
            });
            
            console.log(res);
            window.location.href = 'http://localhost:3000/'
        } catch(error) {
            console.log(error);
        } 
    }

    return (
        <div>
        <form className="trip-basic-info-form" id="create-trip-form-1" onSubmit={e => addTrip(e, tripLocation, tripDescription, tripStartDate, tripEndDate)}>
                    {/* <label className="create-trip-label">Location:</label>
                    <div className="create-trip-lat-long-inputs">
                        <div className="trip-lat">
                            <label for="lat">Latitude:</label>
                            <input type="text" id="lat" name="lat" className="create-trip-input"/>
                        </div>
                        <div className="trip-long">
                            <label for="long">Longitude:</label>
                            <input type="text" id="long" name="long" className="create-trip-input"/>
                        </div>
                    </div> */}
                    <label className="create-trip-label">Location:</label>
                    <input type="text" required={true} className='create-trip-input' onChange={e => {setLocationText(e.target.value)}} value={tripLocation}/>
                    <label className="create-trip-label">Date:</label>
                    <div className="create-trip-date-inputs">
                        <div className="trip-start-date">
                            <label htmlFor="start-date">Start Date:</label>
                            <input type="date" id="start-date" name="start-date" className="create-trip-input" required={true} onChange={e => {setStartDate(e.target.value)}} value={tripStartDate}/>
                        </div>
                        <div className="trip-end-date">
                            <label htmlFor="end-date">End Date:</label>
                            <input type="date" id="end-date" name="end-date" className="create-trip-input" required={true} onChange={e => {setEndDate(e.target.value)}} value={tripEndDate}/>
                        </div>
                    </div>
                    <label htmlFor="description" className="create-trip-label">Description:</label>
                    <textarea type="text" id="trip-description" name="trip-description" className="create-trip-input" required={true} rows="4" cols="50" onChange={e => {setDescriptionText(e.target.value)}} value={tripDescription}></textarea>
                    <label htmlFor="cover-image" className="create-trip-label">Cover Image:</label>
                    <input type="file" id="cover-image" name="cover-image" class="create-trip-input" onChange={e => {setCoverImage(e.target.value)}} value={tripCoverImage}/>
                    <input type="submit" className="create-trip-submit" value="Create Trip" />
                </form>
        </div>
    )
}
