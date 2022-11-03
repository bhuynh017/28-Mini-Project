const express = require('express');
const mysql2 = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'movies_db',
    },
    console.log(`Connected to DB`)
)

app.get('/api/movies', (req, res) => {
    const query = 'SELECT id, movie_name AS title FROM movies';

    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows,
        });
    });
});

app.post('/api/new-movie', ({ body }, res) => {
    const query = 'INSERT INTO movies (movie_name) VALUES (?)';
    const param = [body.movie_name];

    db.query(query, param, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                error: err.message
            });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.get('/api/movie-reviews', (req, res) => {
    const query = 'SELECT movies.movie_name AS movie, reviews.review FROM review LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name';
    db.query(query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})