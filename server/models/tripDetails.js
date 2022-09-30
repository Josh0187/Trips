import mongoose from 'mongoose' 

const tripSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true 
    },
    startDate: {
        type: Date,
        required: true,
        //default: Date.now()
    },
    endDate: {
        type: Date,
        required: true,
        //default: Date.now()
    },
    coverImageURL: {
        type: String,
        required: true
    },
    coverImagePath: {
        type: String
    }
})

const tripDetails = mongoose.model('tripDetails', tripSchema);

export default tripDetails; 