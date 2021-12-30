export default interface BaseUseCase {
  execute: (payload?: object) => Promise<any>
}
