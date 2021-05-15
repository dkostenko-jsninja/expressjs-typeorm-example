export class MockRepository<T, K> {
  constructor(model) {}

  get = jest.fn();
  getAll = jest.fn();
  create = jest.fn();
  createEntity = jest.fn();
  saveEntity = jest.fn();
  updateEntity = jest.fn();
  deleteEntity = jest.fn();
  transform = jest.fn();
  transformMany = jest.fn();
}
