import { isNil } from 'lodash'

class AddEnrollment {
  private readonly studentRepository

  constructor (studentRepository) {
    this.studentRepository = studentRepository
  }

  async execute (studentId, enrollment): Promise<any> {
    const student = await this.studentRepository.getById(studentId)

    if (isNil(student) || isNil(enrollment)) {
      throw new Error('validation failed')
    }

    if (student.enrollments.some(e => e.course.id === enrollment.course.id) === true) {
      throw new Error('validation failed: user already registered to this course')
    }

    return this.studentRepository.addEnrollment(studentId, enrollment)
  }
}

export default AddEnrollment
