import React from 'react'
import TripsList from './TripsList';
import Nav from './Nav'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
    width: "75%",
    height: "700px",
    top: "100px",
    margin: "0 auto",
    borderRadius: "15px",
    borderStyle: "solid", 
    borderColor: "#333",
};

export default function HomePage() {
    const { isLoaded, loadError } = useLoadScript({
    // Would put API key in here
    });
      
    if (loadError) return "Error loading maps"
    if (!isLoaded) return "Loading maps"
    
    return (
        <>
            <Nav />
            <TripsList />
            <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={2.1} mapTypeId='hybrid' center={{lat: 44.011784, lng: -1.757813}}/>
        </>
    )
}
