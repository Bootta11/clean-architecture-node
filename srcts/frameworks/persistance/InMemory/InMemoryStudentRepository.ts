import StudentRepository from '../../../application/contracts/StudentRepository'
import { isNil } from 'lodash'

export default class InMemoryStudentRepository extends StudentRepository {
  private readonly students
  private currentId

  constructor () {
    super()
    this.students = []
    this.currentId = 1
  }

  async add (studentInstance): Promise<any> {
    try {
      this.currentId = Number(this.currentId) + 1
      studentInstance.id = this.currentId
      this.students.push(studentInstance)
    } catch (error) {
      throw new Error('Error Occurred')
    }

    return studentInstance
  }

  async update (studentInstance): Promise<any> {
    let student
    try {
      student = this.students.find(x => x.id === studentInstance.id)
      if (isNil(student)) {
        Object.assign(student, { studentInstance })
      }
    } catch (error) {
      throw new Error('Error Occurred')
    }

    return student
  }

  async delete (studentId): Promise<any> {
    try {
      const studentIndex = this.students.findIndex(x => x.id === studentId)
      if (studentIndex !== -1) {
        this.students.splice(studentIndex, 1)
      }
    } catch (error) {
      throw new Error('Error Occurred')
    }

    return true
  }

  async getById (studentId): Promise<any> {
    let student
    try {
      const id = parseInt(studentId)
      student = this.students.find(x => x.id === id)
    } catch (err) {
      throw new Error('Error Occurred')
    }
    console.log(this.students, student, studentId)
    return student
  }

  async getByEmail (studentEmail): Promise<any> {
    let student
    try {
      student = this.students.find(x => x.email === studentEmail)
    } catch (err) {
      throw new Error('Error Occurred')
    }

    return student
  }

  async getAll (): Promise<any> {
    return this.students
  }

  async addEnrollment (studentId, enrollment): Promise<any> {
    const id = parseInt(studentId)
    const student = this.students.find(x => x.id === id)

    if (isNil(student)) {
      throw new Error('student does not exist')
    }

    if (isNil(student.enrollments)) {
      student.enrollments = []
    }
    student.enrollments.push(enrollment)

    return student
  }
}
