const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

const blog = new Blog({
  title: 'aaa',
  author: 'bbb ccc',
  url: 'https://www.iltalehti.fi/',
  likes: 10
})

blog
  .save()
  .then(response => {
    console.log('blog saved!')
    mongoose.connection.close()
  })

