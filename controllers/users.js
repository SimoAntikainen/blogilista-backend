const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if(body.password.length < 3) {
      return response.status(400).json({ error: 'password less than 3 characters long' })

    }

    const existingUser = await User.find( { username: body.username } )
    if (existingUser.length>0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult === undefined ? true : body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',{
    title: 1,
    author: 1,
    url: 1,
    likes: 1})
  response.json(users.map(User.format))
})


module.exports = usersRouter