const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have an id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(r => expect(r.id).toBeDefined())
})

/*
test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'test',
    author: 'me',
    url: 'none',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /application\/json/)

  const BlogsAtEnd = await helper.blogsInDb()
  expect(BlogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = BlogsAtEnd.map(n => n.title)
  expect(titles).toContain('test')
})

test('blog without likes can be added', async () => {
    const newBlog = {
      title: 'test2',
      author: 'me',
      url: 'none'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
  
    const BlogsAtEnd = await helper.blogsInDb()
  
    expect(BlogsAtEnd[BlogsAtEnd.length-1].likes).toEqual(0)
  })

test('invalid blog cannot be added', async () => {
    const newBlog1 = { author: 'me', url: 'none'}
    
    await api.post('/api/blogs').send(newBlog1)
      .expect(400)
    
    const newBlog2 = { title: 'test3', author: 'me'}
    
    await api.post('/api/blogs').send(newBlog2)
      .expect(400)
})
*/

test('delete blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  expect(blogsAtEnd).not.toContain(blogToDelete)
})

test('update blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = {...blogToUpdate, likes: 100 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)

  const blogsAtEnd = await helper.blogsInDb()

  const blogAtEnd = blogsAtEnd.find(b => b.id === blogToUpdate.id)
  expect(blogAtEnd.likes).toBe(100)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
  })

  test('unique user can be created', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
          username: 'jakov',
          name: 'Jakov basic',
          password: 'salainen',
      }

      await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
  })
})

describe('invalid user is not added', () => {
  test('password too short', async () => {
   
      const newUser = {
          username: 'hesperi',
          name: 'sesperi',
          password: 'ad',
      }
      await api.post('/api/users').send(newUser).expect(400)
  })

  test('username is already in use', async () => {
        
    const newUser = {
        username: 'root',
        name: 'sesperi',
        password: 'adidas',
    }
    await api.post('/api/users').send(newUser).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})