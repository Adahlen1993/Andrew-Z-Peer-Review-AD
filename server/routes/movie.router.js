const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get("/:id", (req, res) => {
  const params = req.params.id;
  const queryText = `
  SELECT
  m.title AS movie_title,
  m.description AS movie_description,
  m.poster AS movie_poster,
  COALESCE(STRING_AGG(g.name, ', '), 'No genres') AS genres
FROM
  movies m
JOIN
  movies_genres mg ON m.id = mg.movie_id
JOIN
  genres g ON mg.genre_id = g.id
WHERE
  m.id = $1
GROUP BY
  m.id, m.title, m.poster, m.description
ORDER BY
  m.title;
  `;
  const queryValues = [params]
  pool.query(queryText, queryValues)
  .then((result) => {
    res.send(result.rows);
    console.log('req params id: ', req.params.id)
  })
  .catch((err) => {
    console.log("Error in GET /api/movies", err);
    res.sendStatus(500);
  });
});

//Stretch Goal
router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
