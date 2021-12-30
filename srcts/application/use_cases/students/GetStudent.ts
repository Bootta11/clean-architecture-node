import BaseUseCase from '../BaseUseCase'

export default class GetStudent implements BaseUseCase {
  private readonly studentRepository

  constructor (studentRepository) {
    this.studentRepository = studentRepository
  }

  async execute ({ studentId }): Promise<any> {
    console.log('stid', studentId)
    return this.studentRepository.getById(studentId)
  }
}
