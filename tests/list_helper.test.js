const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {testBlogs, blogsInDb, initializeDb,postNoteToDb,usersInDb} = require('./test_helper')


//tests for 4.3-4.7
describe.skip('list helpers, tests for 4.3-4.7', () => {

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


//test for parts 4.8-4.11
describe('blogilista tests, for parts 4.8-4.11', () => {
  //part 4.8
  describe('blogilista api/blogs GET tests', () => {
    beforeAll(async () => {
      await initializeDb()
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const dbState = await blogsInDb()
    
      expect(dbState.length).toBe(testBlogs.length)
    })

    test('first and last blog contained in list', async () => {
      const dbState = await blogsInDb()

      //console.log('res body', response.body)
      const contents = dbState.map(r => r.title)  
    
      expect(contents).toContain(testBlogs[0].title)
      expect(contents).toContain(testBlogs[2].title)

    })
  })

  //part 4.9

  describe('blogilista api/blogs POST tests, part 4.9', () => {
    beforeAll(async () => {
      await initializeDb()
    })

    test('a valid blog can be added ', async () => {
      const newBlog1 = {
        title: 'To Serve Man, with Software',
        author: 'Jeff Atwood.',
        url: 'https://blog.codinghorror.com/to-serve-man-with-software/',
        likes: 7
      }

      await postNoteToDb(api,newBlog1,201,/application\/json/)
    
      const dbStateAfter = await blogsInDb()
    
      const titles = dbStateAfter.map(r => r.title)
    
      expect(dbStateAfter.length).toBe(testBlogs.length + 1)
      expect(titles).toContain('To Serve Man, with Software')
    })

    //part 4.10
    test('a blog with no likes can be added,part 4.10 ', async () => {
      const newBlog2 = {
        title: 'No added likes blog',
        author: 'Jeff Atwood.',
        url: 'https://blog.codinghorror.com/success-through-failure/',
      }
    
      await postNoteToDb(api,newBlog2,201,/application\/json/)
    
      const dbStateAfter = await blogsInDb()
    
      const titles = dbStateAfter.map(r => r.title)
      const likes = dbStateAfter.map(r => r.likes)
    
      expect(dbStateAfter.length).toBe(testBlogs.length + 2)
      expect(titles).toContain('No added likes blog')
      expect(likes).toContain(0)
    })

    //part 4.11
    test('a blog with no url and title cannot be added ', async () => {
      const newBlog3 = {
        author: 'Author no url and title'
      }

      await postNoteToDb(api,newBlog3,400,/application\/json/)
      
      const dbStateAfter = await blogsInDb()
    
      const authors = dbStateAfter.map(r => r.author)
    
      expect(dbStateAfter.length).toBe(testBlogs.length + 2)
      expect(authors).not.toContain('Author no url and title')

    })
  })



  describe.only('User addition test into db, part 4.16', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'user1', name : 'name1',adult: false, password: 'password1' })
      await user.save()
    })
  
    test('POST /api/users succeeds with a new unique username', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'user2',
        name: 'name two',
        adult:true,
        password: 'password2'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
      const usernames = usersAfterOperation.map(u=>u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with non unique username', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'user2',
        name: 'name three',
        adult:true,
        password: 'password3'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users fails with password shorter than 3 characters', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'user3',
        name: 'name four',
        adult:true,
        password: 'pa'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    })

    test('POST /api/users if adult value is not defined it is set to true', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'user4',
        name: 'name five',
        password: 'password4'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
      const addedUser = await User.find( { username: newUser.username } )
      expect(addedUser[0].username).toBe(newUser.username)
      expect(addedUser[0].adult).toBe(true)
    })


  })







  afterAll(() => {
    server.close()

  })
})