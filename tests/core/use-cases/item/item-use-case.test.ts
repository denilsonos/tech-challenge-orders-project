import { ItemRepository } from "../../../../src/adapters/gateways/repositories/item-repository";
import { ItemDAO } from "../../../../src/base/dao/item";
import { ItemUseCaseImpl } from "../../../../src/core/use-cases/item/item-use-case";
import { ConflictException, NotFoundException } from "../../../../src/core/entities/exceptions";
import { ItemDTO, ItemOrderDTO } from "../../../../src/base/dto/item";
import { FindItemParams } from "../../../../src/base/dto/generic/find-item-params";

const itemRepositorySpy: jest.Mocked<ItemRepository> = {
  save: jest.fn(),
  getById: jest.fn(),
  getByName: jest.fn(),
  findByParams: jest.fn(),
  update: jest.fn(),
  deleteById: jest.fn(),
}

const mockItemDAO: ItemDAO = {
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

const mockItemDTO = new ItemDTO(
  mockItemDAO.name,
  mockItemDAO.description,
  mockItemDAO.category,
  Number(mockItemDAO.value),
  0,
  Buffer.from(mockItemDAO.image)
)

const mockItemOrderDTO: ItemOrderDTO = {itemId: 1, quantity: 1}

const mockItemParams: FindItemParams = {category: "test"}

const sut = new ItemUseCaseImpl(itemRepositorySpy)

describe('Item use case methods', () => {

  describe('create', () => {

    it('must successfully create an item', async () => {
      itemRepositorySpy.getByName.mockResolvedValue(null)
      itemRepositorySpy.save.mockResolvedValue(mockItemDAO)
      await expect(sut.create(mockItemDTO)).resolves.not.toThrow()
      expect(itemRepositorySpy.getByName).toHaveBeenCalled()
      expect(itemRepositorySpy.save).toHaveBeenCalled()
    })

    it('must return an "item already exists" error', async () => {
      itemRepositorySpy.getByName.mockResolvedValue(mockItemDAO)
      await expect(sut.create(mockItemDTO)).rejects.toThrow(ConflictException)
      expect(itemRepositorySpy.getByName).toHaveBeenCalled()
    })
  })

  describe('getById', () => {

    it('should get a tem by id successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(mockItemDAO)
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
      itemRepositorySpy.findByParams.mockResolvedValue([mockItemDAO])
      await expect(sut.findByParams(mockItemParams)).resolves.not.toThrow()
      expect(itemRepositorySpy.findByParams).toHaveBeenCalled()
    })

    it('should return array of item empty', async () => {
      itemRepositorySpy.findByParams.mockResolvedValue([])
      await expect(sut.findByParams(mockItemParams)).resolves.not.toThrow()
      expect(itemRepositorySpy.findByParams).toHaveBeenCalled()
    })
  })

  describe('delete', () => {

    it('delete an item successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(mockItemDAO)
      itemRepositorySpy.deleteById.mockResolvedValue()
      await expect(sut.delete(1)).resolves.not.toThrow()
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
      expect(itemRepositorySpy.deleteById).toHaveBeenCalled()
    })

    it('item not found', async () => {
      itemRepositorySpy.getById.mockResolvedValue(null)
      await expect(sut.delete(1)).rejects.toThrow(NotFoundException)
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })
  })

  describe('update', () => {

    it('should update an item successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(mockItemDAO)
      itemRepositorySpy.update.mockResolvedValue()
      await expect(sut.update(1, mockItemDTO)).resolves.not.toThrow()
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
      expect(itemRepositorySpy.update).toHaveBeenCalled()
    })

    it('should return item not found', async () => {
      itemRepositorySpy.getById.mockResolvedValue(null)
      await expect(sut.update(1, mockItemDTO)).rejects.toThrow(NotFoundException)
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })
  })

  describe('getAllByIds', () => {

    it('should update an item successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(mockItemDAO)
      await expect(sut.getAllByIds([mockItemOrderDTO])).resolves.not.toThrow()
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })

    it('should update an item successfully', async () => {
      itemRepositorySpy.getById.mockResolvedValue(null)
      await expect(sut.getAllByIds([mockItemOrderDTO])).rejects.toThrow(NotFoundException)
      expect(itemRepositorySpy.getById).toHaveBeenCalled()
    })
  })
})