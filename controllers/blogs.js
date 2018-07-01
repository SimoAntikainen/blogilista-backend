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
    response.status(500).json({ error: 'Internal error' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(formatBlog(updatedBlog))

  } catch(exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })  
  }

})

module.exports = blogsRouter

/**Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(formatBlog(updatedBlog))
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })**/


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