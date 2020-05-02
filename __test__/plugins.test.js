const supertest = require('supertest')
const app = require('../index')

describe('Testing the plugins API', () => {
  it('tests the plugins routes and return all plugins id', async () => {
    const response = await supertest(app).get('/plugins')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('plugins')
  })

  it('tests if the desired plugin is present in the list of plugins and returns all its information', async () => {
    const response = await supertest(app).get('/plugins/flutter-plugin')

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('plugin')
  })

  it('tests if the desired plugin is NOT present in the list of plugins and returns an error', async () => {
    const response = await supertest(app).get('/plugins/flutter')

    expect(response.status).toBe(404)
    expect(response.text).toBe('Not Found')
  })
})
