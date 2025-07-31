const dinosaureController = require('../src/controllers/dinosaurController');
const { Dinosaure } = require('../src/models');

jest.mock('../src/models', () => ({
  Dinosaure: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

const mockResponse = () => {
  const res = {};
  ['status', 'json', 'send'].forEach(fn => {
    res[fn] = jest.fn().mockReturnValue(res);
  });
  return res;
};

describe('Dinosaur Controller', () => {
  afterEach(jest.clearAllMocks);

  test('getAllDinosaures returns dinos', async () => {
    const dinos = [{ name: 'Rex' }, { name: 'Tricera' }];
    Dinosaure.findAll.mockResolvedValue(dinos);
    const res = mockResponse();

    await dinosaureController.getAllDinosaures({}, res);

    expect(Dinosaure.findAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(dinos);
  });

  test('getDinosaureById - found', async () => {
    const dino = { id: 1, name: 'Rex' };
    Dinosaure.findByPk.mockResolvedValue(dino);
    const req = { params: { id: 1 } };
    const res = mockResponse();

    await dinosaureController.getDinosaureById(req, res);

    expect(Dinosaure.findByPk).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(dino);
  });

  test('getDinosaureById - not found', async () => {
    Dinosaure.findByPk.mockResolvedValue(null);
    const req = { params: { id: 99 } };
    const res = mockResponse();

    await dinosaureController.getDinosaureById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Dinosaure not found' });
  });

  test('createDinosaure - success', async () => {
    const newDino = { name: 'Raptor' };
    Dinosaure.create.mockResolvedValue(newDino);
    const req = { body: newDino };
    const res = mockResponse();

    await dinosaureController.createDinosaure(req, res);

    expect(Dinosaure.create).toHaveBeenCalledWith(newDino);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newDino);
  });
});
