import axios from 'axios' 

const url = 'https://localhost:5000/trips';

export const fetchTrips = () => axios.get(url);