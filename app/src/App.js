import React from 'react';
import HomePage from './HomePage'
import CreateTripPage from './CreateTripPage';
import TripsPage from './TripsPage';
import { Route, Routes } from 'react-router-dom'

export default function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={ <HomePage /> } />
        <Route exact path='/create-trip' element={ <CreateTripPage /> }/>
        <Route exact path='/trips/:id' element={ <TripsPage /> }/>
      </Routes>
    </>
  ) 
}
