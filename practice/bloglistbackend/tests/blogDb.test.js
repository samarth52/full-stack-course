/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./blogDb.helper')
const app = require('../app')

const api = supertest(app)
const tokens = []

beforeAll(async () => {
  await User.deleteMany({})

  for (const initialUser of helper.initialUsers) {
    await User({
      _id: initialUser._id,
      name: initialUser.name,
      username: initialUser.username,
      passwordHash: await bcrypt.hash(initialUser.password, 10),
    }).save()

    const response = await api
      .post('/api/login')
      .send({
        username: initialUser.username,
        password: initialUser.password,
      })
    tokens.push(`bearer ${response.body.token}`)
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET', () => {
  test('all blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('check if id field exists', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST', () => {
  test('new blog post', async () => {
    const blog = {
      title: 'Test Blog',
      author: 'Samarth Chandna',
      url: 'http://testurl.com',
      likes: 14,
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: tokens[1] })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.retrieveBlogs()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('checks *likes* defaults to 0 if missing', async () => {
    const blog = {
      _id: '62e02858e1a3efcc820a891a',
      title: 'Test Blog',
      author: 'Samarth Chandna',
      url: 'http://testurl.com',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: tokens[1] })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.retrieveBlogs()
    expect(blogs[helper.initialBlogs.length].likes).toBe(0)
  })

  test('fail validation for missing title etc.', async () => {
    const blog = {
      author: 'Samarth Chandna',
    }

    await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: tokens[1] })
      .expect(400)
  })

  test('fail missing token', async () => {
    const blog = {
      _id: '62e02858e1a3efcc820a891a',
      title: 'Test Blog',
      author: 'Samarth Chandna',
      url: 'http://testurl.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(401)
    expect(response.body.error).toBe('missing or invalid token')
  })

  test('fail invalid token', async () => {
    const blog = {
      _id: '62e02858e1a3efcc820a891a',
      title: 'Test Blog',
      author: 'Samarth Chandna',
      url: 'http://testurl.com',
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .set({ Authorization: 'randomToken' })
      .expect(401)
    expect(response.body.error).toBe('missing or invalid token')
  })
})

describe('DELETE', () => {
  test('delete blog', async () => {
    await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: tokens[0] })
      .expect(204)

    const blogs = await helper.retrieveBlogs()
    expect(blogs.length).toBe(helper.initialBlogs.length - 1)
  })

  test('fail missing token', async () => {
    const response = await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: 'randomToken' })
      .expect(401)
    expect(response.body.error).toBe('missing or invalid token')
  })

  test('fail invalid id', async () => {
    const response = await api
      .delete('/api/blogs/62e159df67717d92ef256cc1')
      .set({ Authorization: tokens[0] })
      .expect(400)
    expect(response.body.error).toBe('invalid id')
  })

  test('fail different user', async () => {
    const response = await api
      .delete('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: tokens[1] })
      .expect(403)
    expect(response.body.error).toBe('blog cannot be deleted by non-owners')
  })
})

describe('PUT', () => {
  test('update blog', async () => {
    await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: tokens[0] })
      .send({ likes: 45 })
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.retrieveBlogs()
    expect(blogs[0].likes).toBe(45)
  })

  test('fail missing token', async () => {
    const response = await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: 'randomToken' })
      .send({ likes: 45 })
      .expect(401)
    expect(response.body.error).toBe('missing or invalid token')
  })

  test('fail invalid id', async () => {
    const response = await api
      .put('/api/blogs/62e159df67717d92ef256cc1')
      .set({ Authorization: tokens[0] })
      .send({ likes: 45 })
      .expect(400)
    expect(response.body.error).toBe('invalid id')
  })

  test('fail different user', async () => {
    const response = await api
      .put('/api/blogs/5a422a851b54a676234d17f7')
      .set({ Authorization: tokens[1] })
      .send({ likes: 45 })
      .expect(403)
    expect(response.body.error).toBe('blog cannot be updated by non-owners')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
