const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')


//tests for 4.3-4.7
describe.skip('list helpers', () => {

  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })


  describe('total likes', () => {

    const listWithNoBlog = []

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithManyBlogs = [
      {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
      },
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0
      },
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0
      }  
    ]

    test('of list of size 0 is zero', () => {
      const result = listHelper.totalLikes(listWithNoBlog)
      expect(result).toBe(0)
    })


    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of list of size 2-or larger is summed up rightly', () => {
      const result = listHelper.totalLikes(listWithManyBlogs)
      expect(result).toBe(36)
    })



  })


  describe('most favourited', () => {

    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    ]

    const listWithManyBlogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 1
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 3
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        likes: 3
      }  
    ]

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.favouriteBlog(listWithOneBlog)
      expect(result).toEqual(listWithOneBlog[0])
    })

    test('when list has many blogs most favourited is the last blog with the most votes', () => {
      const result = listHelper.favouriteBlog(listWithManyBlogs)
      expect(result).toEqual(listWithManyBlogs[4])
    })

  })

  describe('most blogs by author', () => {

    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    ]

    const listWithManyBlogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 1
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 3
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        likes: 3
      }  
    ]

    const mostBlogsFirstCase = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    const mostBlogsSecondCase = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    test('when list has only one blog it is most popular', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(mostBlogsFirstCase)
    })

    test('when list has many blogs most blogs having authors is the author with the most blogs', () => {
      const result = listHelper.mostBlogs(listWithManyBlogs)
      expect(result).toEqual(mostBlogsSecondCase)
    })

  })


  describe('most liked author', () => {

    const listWithOneBlog = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      }
    ]

    const listWithManyBlogs = [
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 1
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 3
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 1
      },
      {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 4
      },
      {
        title: 'Type wars',
        author: 'Robert C. Martin',
        likes: 3
      }  
    ]

    const mostLikesFirstCase = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    const mostLikesSecondCase = {
      author: 'Robert C. Martin',
      likes: 11
    }

    test('when list has only author he is the most popular', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(mostLikesFirstCase)
    })

    test('when list has many blogs most liked authors is the author with the most blogs', () => {
      const result = listHelper.mostLikes(listWithManyBlogs)
      expect(result).toEqual(mostLikesSecondCase)
    })

  })

})

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


//test for parts 4.8-4.11
describe('blogilista tests', () => {

  describe('blogilista api/blogs GET tests', () => {
    beforeAll(async () => {
      await Blog.remove({})
    
      const blogObjects = testBlogs.map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api
        .get('/api/blogs')
    
      expect(response.body.length).toBe(testBlogs.length)
    })

    test('first and last blog contained in list', async () => {
      const response = await api
        .get('/api/blogs')

      //console.log('res body', response.body)
      const contents = response.body.map(r => r.title)  
    
      expect(contents).toContain(testBlogs[0].title)
      expect(contents).toContain(testBlogs[2].title)

    })
  })

  describe('blogilista api/blogs POST tests', () => {
    beforeAll(async () => {
      await Blog.remove({})
    
      const blogObjects = testBlogs.map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    })

    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'To Serve Man, with Software',
        author: 'Jeff Atwood.',
        url: 'https://blog.codinghorror.com/to-serve-man-with-software/',
        likes: 7
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api
        .get('/api/blogs')
    
      const contents = response.body.map(r => r.title)
    
      expect(response.body.length).toBe(testBlogs.length + 1)
      expect(contents).toContain('To Serve Man, with Software')
    })

  })

  afterAll(() => {
    server.close()
  })


})