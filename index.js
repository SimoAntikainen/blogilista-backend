const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')


if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI
// mongoose.connect(mongoUrl)
mongoose
  .connect(mongoUrl)
  .then( () => {
    console.log('connected to database', mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

app.use(cors())
app.use(bodyParser.json())  
app.use(middleware.logger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})