/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./blogDb.helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('retrieve all blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('create new blog post', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Samarth Chandna',
    url: 'http://testurl.com',
    likes: 14,
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.retrieveBlogs()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('checks likes defaults to 0 if missing', async () => {
  const blog = {
    _id: '62e02858e1a3efcc820a891a',
    title: 'Test Blog',
    author: 'Samarth Chandna',
    url: 'http://testurl.com',
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.retrieveBlogs()
  expect(blogs[helper.initialBlogs.length].likes).toBe(0)
})

test('checks validation error', async () => {
  const blog = {
    author: 'Samarth Chandna',
  }

  await api
    .post('/api/blogs', blog)
    .expect(400)
})

test('delete blog', async () => {
  await api
    .delete('/api/blogs/5a422a851b54a676234d17f7')
    .expect(204)

  const blogs = await helper.retrieveBlogs()
  expect(blogs.length).toBe(helper.initialBlogs.length - 1)
})

test('delete blog', async () => {
  await api
    .delete('/api/blogs/test')
    .expect(400)
})

test('update blog', async () => {
  await api
    .put('/api/blogs/5a422a851b54a676234d17f7')
    .send({ likes: 45 })
    .expect(204)

  const blogs = await helper.retrieveBlogs()
  expect(blogs[0].likes).toBe(45)
})

afterAll(() => {
  mongoose.connection.close()
})
