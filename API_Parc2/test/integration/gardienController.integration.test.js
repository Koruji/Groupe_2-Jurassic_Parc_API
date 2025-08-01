const request = require('supertest');
const { sequelize } = require('../../src/config/database');
const app = require('../../src/app');
const { Gardien } = require('../../src/models');

describe('Gardien API integration tests', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  let createdGardienId;

  test('POST /api/gardiens - should create a new gardien', async () => {
    const newGardien = {
      name: 'John Doe',
      specialty: 'security',
      sector: 'North',
      available: true,
      experience: 5
    };

    const res = await request(app)
      .post('/api/gardiens')
      .send(newGardien)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newGardien.name);
    createdGardienId = res.body.id;
  });

  test('GET /api/gardiens - should return all gardiens', async () => {
    const res = await request(app)
      .get('/api/gardiens')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/gardiens/:id - should return the gardien by id', async () => {
    const res = await request(app)
      .get(`/api/gardiens/${createdGardienId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdGardienId);
  });

  test('PUT /api/gardiens/:id - should update the gardien', async () => {
    const updateData = { experience: 8, available: false };

    const res = await request(app)
      .put(`/api/gardiens/${createdGardienId}`)
      .send(updateData)
      .expect(200);

    expect(res.body.experience).toBe(updateData.experience);
    expect(res.body.available).toBe(updateData.available);
  });

  test('DELETE /api/gardiens/:id - should delete the gardien', async () => {
    await request(app)
      .delete(`/api/gardiens/${createdGardienId}`)
      .expect(204);
    await request(app)
      .get(`/api/gardiens/${createdGardienId}`)
      .expect(404);
  });
});
