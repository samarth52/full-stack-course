/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./userDb.helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (const initialUser of helper.initialUsers) {
    await User({
      name: initialUser.name,
      username: initialUser.username,
      passwordHash: await bcrypt.hash(initialUser.password, 10),
    }).save()
  }
})

test('add valid user', async () => {
  const user = {
    username: 'sammy123',
    name: 'Samarth Chandna',
    password: 'thisismypassword@123',
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const users = await helper.retrieveUsers()
  expect(users).toHaveLength(helper.initialUsers.length + 1)
  expect(users[helper.initialUsers.length].username).toBe(user.username)
})

test('add duplicate user', async () => {
  const user = {
    username: 'root',
    name: 'root',
    password: 'thisismypassword@123',
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const users = await helper.retrieveUsers()
  expect(users).toHaveLength(helper.initialUsers.length)

  const passwordComparison = await bcrypt.compare(
    helper.initialUsers[0].password,
    users[0].passwordHash,
  )
  expect(passwordComparison).toBe(true)
})

test('add invalid user', async () => {
  const user = {
    password: 'a123',
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const users = await helper.retrieveUsers()
  expect(users).toHaveLength(helper.initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})
