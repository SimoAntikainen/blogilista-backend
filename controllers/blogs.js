const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/**const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}**/
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name : 1})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request,response) => {
  try {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if(body.title === undefined && body.url === undefined) {
      return response.status(400).json({ error: 'author and url missing' })    
    }
    if(body.likes === undefined) {
      body['likes'] = 0
    }

    const user = await User.findById(decodedToken.id)
    console.log("user id", user.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user : user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    const formattedBlog = Blog.format(savedBlog)
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
    response.json(Blog.format(updatedBlog))

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