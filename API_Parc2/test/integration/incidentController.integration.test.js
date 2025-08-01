const request = require('supertest');
const app = require('../../src/app'); // Assure-toi que ce fichier exporte ton app Express
const { sequelize } = require('../../src/config/database');
const { Incident, Gardien } = require('../../src/models');

describe('Incident API Integration Tests', () => {
  let server;
  let gardien;

  beforeAll(async () => {
    gardien = await Gardien.create({
      name: 'John Keeper',
      specialty: 'carnivores',
      sector: 'Zone A',
      experience: 5
    });

    server = request(app);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  let createdIncidentId;

  test('POST /api/incidents - should create a new incident with assigned keeper', async () => {
    const response = await server.post('/api/incidents').send({
      type: 'escape',
      severity: 'high',
      location: 'Sector B',
      assignedKeeper: gardien.id
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.keeper.id).toBe(gardien.id);
    createdIncidentId = response.body.id;
  });

  test('GET /api/incidents - should fetch all incidents including keeper', async () => {
    const response = await server.get('/api/incidents');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('keeper');
    expect(response.body[0].keeper.id).toBe(gardien.id);
  });

  test('GET /api/incidents/:id - should fetch a specific incident by ID', async () => {
    const response = await server.get(`/api/incidents/${createdIncidentId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(createdIncidentId);
    expect(response.body.keeper.id).toBe(gardien.id);
  });

  test('PUT /api/incidents/:id - should update incident status', async () => {
    const response = await server.put(`/api/incidents/${createdIncidentId}`).send({
      status: 'in-progress'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('in-progress');
  });

  test('DELETE /api/incidents/:id - should delete an incident', async () => {
    const response = await server.delete(`/api/incidents/${createdIncidentId}`);
    expect(response.statusCode).toBe(204);

    const getDeleted = await server.get(`/api/incidents/${createdIncidentId}`);
    expect(getDeleted.statusCode).toBe(404);
  });
});
