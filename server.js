require('dotenv').config()
const express = require('express')
const morgan = require('morgan')


const MOVIEDEX = require('./moviedex.json')

const app = express()

app.use(morgan('dev'))

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  // move to the next middleware
  next()
})
const validGenre = ['Animation', 'Drama', 'Romantic', 'Comedy', 'Spy', 'Crime', 'Thriller', 'Adventure', 'Documentary', 'Horror', 'Action', 'Western', 'History', 'Biography', 'Musical', 'Fantasy', 'War', 'Grotesque']

app.get('/genre', function handleGetGenre(req, res) {
  res.json(validTGenre)
})


function handleGetGenre(req, res) {

}
app.get('/genre', handleGetGenre)

function handleGetFilmTitle(req, res) {
  res.send('movie time!')
}
if (req.query.name) {
  response = response.filter(genre =>
    // case insensitive searching
    genre.name.toLowerCase().includes(req.query.name.toLowerCase())
  )
}
app.get('/title', handleGetFilmTitle)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
