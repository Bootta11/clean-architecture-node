export interface Mapper<T> {
  toDomain: (raw: any) => T
  toDTO: (t: T) => any
  toPersistence: (t: T) => any
}
