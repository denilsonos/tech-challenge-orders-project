export interface DeleteItemUseCase {
  delete(itemId: number): Promise<void>
}
