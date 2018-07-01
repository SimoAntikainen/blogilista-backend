const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(formatBlog))
})

blogsRouter.post('/', async (request,response) => {
  try {
    const body = request.body

    if(body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'author and url missing' })    
    }
    if(body.likes === undefined) {
      body['likes'] = 0
    }

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    const formattedBlog = formatBlog(savedBlog)
    response.status(201).json(formattedBlog)


  } catch (exception) {
    console.log(exception)
  }
})

/**blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(formatBlog))
    })
})**/

/**blogsRouter.post('/', (request,response) => {
  const blog = new Blog(request.body)

  //not sure if return value should be formatted
  blog
    .save()
    .then(result => {
      return formatBlog(result)
    })
    .then(result => {
      response.status(201).json(result)
    })
})**/

module.exports = blogsRouter