import express from 'express'
import { getTrips, getTrip, createTrip, updateTrip, deleteTrip } from '../controllers/trips.js'

const router = express.Router();

router.get('/api/trips', getTrips);
router.get('/api/trip/:id', getTrip);
router.post('/api/trip', createTrip);
router.put('/api/trip/:id', updateTrip);
router.delete('/api/trip/:id', deleteTrip);
export default router;