import Student from '../../../entities/Student'
import BaseUseCase from '../BaseUseCase'
import { isNil } from 'lodash'

class AddStudent implements BaseUseCase {
  private readonly studentRepository
  private readonly crmService

  constructor (studentRepository, crmService) {
    this.studentRepository = studentRepository
    this.crmService = crmService
  }

  async execute ({ firstName, lastName, email }): Promise<any> {
    const student = await this.studentRepository.getByEmail(email)

    // validate
    if (isNil(firstName) || isNil(lastName) || isNil(email)) {
      throw new Error('validation failed')
    }

    // check if student exist by email
    if (!isNil(student)) {
      throw new Error('email already exist in the system')
    }

    // create new student object
    let newStudent = new Student(firstName, lastName, email)

    // persist student
    newStudent = await this.studentRepository.add(newStudent)

    // notify crm system
    await this.crmService.notify(newStudent)

    return 'student added successfully'
  }
}

export default AddStudent
