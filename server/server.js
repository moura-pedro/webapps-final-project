const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const promisefs = require('node:fs/promises')
const Movie = require('./models/Movie')
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Your React app URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection - removed deprecated options
mongoose.connect('mongodb://localhost:27017/movies-app')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
parseMovies('movies.json')

// Parse movies.json and save to mongoDB
async function parseMovies(moviepath) {
    try {
        const data = await promisefs.readFile(moviepath, 'utf8');
        const json = JSON.parse(data)
        json.forEach((item) => {
            const movie = new Movie({
                year: item.year,
                title: item.title,
                info: item.info}
            )
            movie.save()
                .then(() => console.log('Saved new movie: ', item.title)
                ).catch(movieerr => {
                    if (!movieerr.code === 11000) {
                        // ignore duplicate key error
                        console.log('Error saving movie: ', item.title, movieerr)   
                    }
                } )
        })
    } catch (err) {
        console.log('Error reading file: ', err);
    }
}