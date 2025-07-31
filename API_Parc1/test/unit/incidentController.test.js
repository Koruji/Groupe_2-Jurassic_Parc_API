const { Incident, Gardien } = require('../../src/models');
const incidentController = require('../../src/controllers/incidentController');

jest.mock('../../src/models');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('incidentController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllIncidents renvoie la liste des incidents', async () => {
    const fakeIncidents = [{ id: 1, type: 'escape' }];
    Incident.findAll.mockResolvedValue(fakeIncidents);

    const req = {};
    const res = mockRes();

    await incidentController.getAllIncidents(req, res);

    expect(Incident.findAll).toHaveBeenCalledWith({
      include: [{
        model: Gardien,
        as: 'keeper',
        attributes: ['id', 'name', 'specialty']
      }]
    });
    expect(res.json).toHaveBeenCalledWith(fakeIncidents);
  });

  test('getIncidentById retourne 404 si non trouvé', async () => {
    Incident.findByPk.mockResolvedValue(null);

    const req = { params: { id: 42 } };
    const res = mockRes();

    await incidentController.getIncidentById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Incident not found' });
  });

  test('createIncident crée un incident', async () => {
    const fakeIncident = { id: 1, type: 'malfunction' };
    Incident.create.mockResolvedValue(fakeIncident);
    Incident.findByPk.mockResolvedValue(fakeIncident);

    const req = { body: fakeIncident };
    const res = mockRes();

    await incidentController.createIncident(req, res);

    expect(Incident.create).toHaveBeenCalledWith(fakeIncident);
    expect(Incident.findByPk).toHaveBeenCalledWith(fakeIncident.id, {
      include: [{
        model: Gardien,
        as: 'keeper',
        attributes: ['id', 'name', 'specialty']
      }]
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeIncident);
  });

  test('deleteIncident retourne 204 si supprimé', async () => {
    Incident.destroy.mockResolvedValue(1);

    const req = { params: { id: 1 } };
    const res = mockRes();

    await incidentController.deleteIncident(req, res);

    expect(Incident.destroy).toHaveBeenCalledWith({
      where: { id: 1 }
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteIncident retourne 404 si non trouvé', async () => {
    Incident.destroy.mockResolvedValue(0);

    const req = { params: { id: 999 } };
    const res = mockRes();

    await incidentController.deleteIncident(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Incident not found' });
  });
});
