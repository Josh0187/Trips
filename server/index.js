import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import tripsRoutes from './routes/trips.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', tripsRoutes);

app.use(bodyParser.json({  limit: "50mb" , extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


const PORT = process.env.PORT || 5000;
const DB_CONNECT = process.env.DB_CONNECT || "mongodb+srv://trips:trips123@cluster0.jbqf9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

