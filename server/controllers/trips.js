import tripDetails from '../models/tripDetails.js'

export const getTrips = async (req, res) => {
    try {
        const trips = await tripDetails.find();
        res.status(200).json(trips);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getTrip = async (req, res) => {
    try {
        const trips = await tripDetails.findById(req.params.id)
        res.status(200).json(trips);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const createTrip = async (req, res) => {
    const trip = req.body; 
    const newTrip = new tripDetails(trip);
    try  {
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
    //res.send('Trip Creation');
}

export const updateTrip = async (req, res) => {
    try {
        // find the item by id and update it
        const updatedItem = await tripDetails.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json(`Trip with id ${req.params.id} was updated successfully`)
    } catch(error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteTrip = async (req, res) => {
    try {
        const deleteTrip = await tripDetails.findByIdAndDelete(req.params.id);
        res.status(200).json(`Trip with id ${req.params.id} was deleted successfully`);
    } catch(error) {
        res.status(409).json({ message: error.message});
    }
}