import DatabaseServices from '../../../application/contracts/DatabaseServices'
import InMemoryStudentRepository from './InMemoryStudentRepository'
import Student from '../../../entities/Student'

export default class InMemoryDatabaseServices extends DatabaseServices {
  constructor () {
    super()
    this.studentRepository = new InMemoryStudentRepository()
  }

  async initDatabase (): Promise<void> {
    await this.seedData()
  }

  async seedData (): Promise<void> {
    let sampleStudent = new Student('royi', 'benita', 'royibeni@gmail.com')

    sampleStudent = await this.studentRepository.add(sampleStudent)
    await this.studentRepository.addEnrollment(sampleStudent.id, { course: { id: 1, name: 'math' }, grade: 95 })
  }
}
