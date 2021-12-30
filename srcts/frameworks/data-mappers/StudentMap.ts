import { Mapper } from './Mapper'
import Student from '../../entities/Student'
import { get } from 'lodash'

export class StudentMap implements Mapper<Student> {
  toDomain (raw: any): Student {
    return new Student(
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.enrollments
    )
  }

  toPersistence (t: Student): any {
    return {
      firstName: t.firstName,
      lastName: t.lastName,
      email: t.email,
      enrollments: t.enrollments
    }
  }

  toDTO (t: Student): any {
    return {
      id: get(t, 'id'),
      firstName: get(t, 'firstName'),
      lastName: get(t, 'lastName'),
      email: get(t, 'email'),
      enrollments: get(t, 'enrollments'),
      fullName: get(t, 'fullName')
    }
  }
}
