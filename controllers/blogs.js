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

/**blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(formatBlog))
    })
})**/

blogsRouter.post('/', (request,response) => {
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
})














module.exports = blogsRouter