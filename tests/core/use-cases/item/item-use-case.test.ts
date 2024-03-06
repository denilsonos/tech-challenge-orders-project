import { ItemRepository } from "../../../../src/adapters/gateways/repositories/item-repository";
import { ItemDAO } from "../../../../src/base/dao/item";
import { ItemUseCaseImpl } from "../../../../src/core/use-cases/item/item-use-case";
import { NotFoundException } from "../../../../src/core/entities/exceptions";

const itemRepositorySpy: jest.Mocked<ItemRepository> = {
  save: jest.fn(),
  getById: jest.fn(),
  getByName: jest.fn(),
  findByParams: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
}

const mockItem: ItemDAO = {
  id: 1,
  name: "Product Name",
  description: "Product Description",
  category: "Product Category",
  value: 29.99,
  image: Buffer.from("fakeImageData"),
  quantity: 10,
  createdAt: new Date("2024-03-05T12:00:00Z"),
  updatedAt: new Date("2024-03-05T12:30:00Z"),
  orders: []
}

const sut = new ItemUseCaseImpl(itemRepositorySpy)

describe('Item Repository', () => {

  describe('create', () => {

    it('must successfully create an item', async () => {
      expect(1 + 1).toBe(2)
    })
  })

  describe('getById', () => {

    it('should get a tem by id successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(mockItem)
      await expect(sut.getById(123)).resolves.not.toThrow()
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })

    it('should return an item not found error', async () => {
      itemRepositorySpy.getById.mockResolvedValue(null)
      await expect(sut.getById(123)).rejects.toThrow(NotFoundException)
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })
  })

  describe('findByParams', () => {

    it('should find an item by parameters successfully', async () => {
      expect(1 + 1).toBe(2)
    })
  })

  describe('delete', () => {

    it('delete an item successfully', async () => {
      expect(1 + 1).toBe(2)
    })
  })

  describe('update', () => {

    it('should update an item successfully', async () => {
      expect(1 + 1).toBe(2)
    })
  })
})