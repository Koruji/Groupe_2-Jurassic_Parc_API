const { Dinosaure } = require('../../src/models');
const dinosaureController = require('../../src/controllers/dinosaureController');

jest.mock('../../src/models');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('dinosaureController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllDinosaures retourne la liste', async () => {
    const fakeDinos = [{ id: 1, name: 'Rex' }];
    Dinosaure.findAll.mockResolvedValue(fakeDinos);

    const req = {};
    const res = mockRes();

    await dinosaureController.getAllDinosaures(req, res);

    expect(Dinosaure.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(fakeDinos);
  });

  test('getDinosaureById retourne 404 si non trouvé', async () => {
    Dinosaure.findByPk.mockResolvedValue(null);

    const req = { params: { id: 42 } };
    const res = mockRes();

    await dinosaureController.getDinosaureById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Dinosaure not found' });
  });

  test('createDinosaure fonctionne', async () => {
    const newDino = { name: 'Tricératops' };
    Dinosaure.create.mockResolvedValue(newDino);

    const req = { body: newDino };
    const res = mockRes();

    await dinosaureController.createDinosaure(req, res);

    expect(Dinosaure.create).toHaveBeenCalledWith(newDino);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newDino);
  });

  test('updateDinosaure retourne 404 si pas trouvé', async () => {
    Dinosaure.update.mockResolvedValue([0]);

    const req = { params: { id: 99 }, body: { name: 'Majungasaurus' } };
    const res = mockRes();

    await dinosaureController.updateDinosaure(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Dinosaure not found' });
  });

  test('deleteDinosaure retourne 204 si succès', async () => {
    Dinosaure.destroy.mockResolvedValue(1);

    const req = { params: { id: 5 } };
    const res = mockRes();

    await dinosaureController.deleteDinosaure(req, res);

    expect(Dinosaure.destroy).toHaveBeenCalledWith({ where: { id: 5 } });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
