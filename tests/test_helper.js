const Blog = require('../models/blog')

const testBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const initializeDb = async () => {
  await Blog.remove({})  
  const blogObjects = testBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}

const postNoteToDb = async (api, newBlog, statusCode, resType) => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(statusCode)
    .expect('Content-Type', resType)
}



module.exports = {
  testBlogs,blogsInDb,initializeDb,postNoteToDb
}