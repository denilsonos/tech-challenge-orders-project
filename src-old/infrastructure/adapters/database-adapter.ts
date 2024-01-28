export interface DatabaseAdapter {
  init(): Promise<void>
}
