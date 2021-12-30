import BaseUseCase from '../BaseUseCase'

export default class GetAllStudents implements BaseUseCase {
  private readonly studentRepository

  constructor (studentRepository) {
    this.studentRepository = studentRepository
  }

  async execute (payload?: object): Promise<any> {
    return this.studentRepository.getAll()
  }
}
