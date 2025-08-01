const request = require('supertest');
const { sequelize } = require('../../src/config/database');
const app = require('../../src/app');
const { Dinosaure } = require('../../src/models');

describe('Dinosaure API integration tests', () => {
  afterAll(async () => {
    await sequelize.close();
  });

  let createdDinosaureId;

  test('POST /api/dinosaures - should create a new dinosaure', async () => {
    const newDino = {
      name: 'T-Rex',
      species: 'Tyrannosaurus rex',
      enclosure: 'Cage 1',
      healthStatus: 'healthy',
      dangerLevel: 9
    };

    const res = await request(app)
      .post('/api/dinosaures')
      .send(newDino)
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(newDino.name);
    expect(res.body.species).toBe(newDino.species);
    createdDinosaureId = res.body.id;
  });

  test('GET /api/dinosaures - should return all dinosaures', async () => {
    const res = await request(app)
      .get('/api/dinosaures')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/dinosaures/:id - should return the dinosaure by id', async () => {
    const res = await request(app)
      .get(`/api/dinosaures/${createdDinosaureId}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', createdDinosaureId);
  });

  test('PUT /api/dinosaures/:id - should update the dinosaure', async () => {
    const updateData = { healthStatus: 'sick', dangerLevel: 7 };

    const res = await request(app)
      .put(`/api/dinosaures/${createdDinosaureId}`)
      .send(updateData)
      .expect(200);

    expect(res.body.healthStatus).toBe(updateData.healthStatus);
    expect(res.body.dangerLevel).toBe(updateData.dangerLevel);
  });

  test('DELETE /api/dinosaures/:id - should delete the dinosaure', async () => {
    await request(app)
      .delete(`/api/dinosaures/${createdDinosaureId}`)
      .expect(204);
    await request(app)
      .get(`/api/dinosaures/${createdDinosaureId}`)
      .expect(404);
  });
});
