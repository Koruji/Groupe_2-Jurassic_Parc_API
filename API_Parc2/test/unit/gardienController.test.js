const { Gardien, Incident } = require('../../src/models');
const gardienController = require('../../src/controllers/gardienController');

jest.mock('../../src/models');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('gardienController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllGardiens renvoie tous les gardiens', async () => {
    const fakeGardiens = [{ id: 1, name: 'John Hammond' }];
    Gardien.findAll.mockResolvedValue(fakeGardiens);

    const req = {};
    const res = mockRes();

    await gardienController.getAllGardiens(req, res);

    expect(Gardien.findAll).toHaveBeenCalledWith({
      include: [{
        model: Incident,
        as: 'incidents',
        attributes: ['id', 'type', 'severity', 'status']
      }]
    });
    expect(res.json).toHaveBeenCalledWith(fakeGardiens);
  });

  test('getGardienById retourne 404 si gardien non trouvé', async () => {
    Gardien.findByPk.mockResolvedValue(null);

    const req = { params: { id: 123 } };
    const res = mockRes();

    await gardienController.getGardienById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gardien not found' });
  });

  test('createGardien crée un gardien', async () => {
    const newGardien = { name: 'Ellie Sattler' };
    Gardien.create.mockResolvedValue(newGardien);

    const req = { body: newGardien };
    const res = mockRes();

    await gardienController.createGardien(req, res);

    expect(Gardien.create).toHaveBeenCalledWith(newGardien);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newGardien);
  });

  test('deleteGardien retourne 204 si supprimé', async () => {
    Gardien.destroy.mockResolvedValue(1);

    const req = { params: { id: 1 } };
    const res = mockRes();

    await gardienController.deleteGardien(req, res);

    expect(Gardien.destroy).toHaveBeenCalledWith({
      where: { id: 1 }
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  test('deleteGardien retourne 404 si gardien non trouvé', async () => {
    Gardien.destroy.mockResolvedValue(0);

    const req = { params: { id: 999 } };
    const res = mockRes();

    await gardienController.deleteGardien(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Gardien not found' });
  });
});
