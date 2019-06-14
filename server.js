require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIEs = require('./movie-data-small.json')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())


app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  console.log(authToken)
  console.log(apiToken)
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})
const validGenre = ['Animation', 'Drama', 'Romantic', 'Comedy', 'Spy', 'Crime', 'Thriller', 'Adventure', 'Documentary', 'Horror', 'Action', 'Western', 'History', 'Biography', 'Musical', 'Fantasy', 'War', 'Grotesque']

app.get('/movies', function handleGetMovies(req, res) {
  let response = MOVIES.movies;

  if (req.query.avg_vote) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_votes))
  }

  if (req.query.country) {
    response = response.filter(movie =>
      // case insensitive searching
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    )
  }

  if (req.query.genre) {
    response = response.filter(movie =>
      // case insensitive searching
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    )
  }

  if (response.length === 0) {
    res.status(200).send('We didn\'t find any movies!');
  } else {
    res.json(response);
  }
})



const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
