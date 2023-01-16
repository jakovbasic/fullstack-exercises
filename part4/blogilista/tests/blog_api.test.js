const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

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

afterAll(() => {
  mongoose.connection.close()
})