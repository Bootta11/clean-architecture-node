export default abstract class StudentRepository {
  abstract add (studentInstance)

  abstract update (studentInstance)

  abstract delete (studentInstance)

  abstract getById (StudentId)

  abstract getByEmail (StudentId)

  abstract getAll ()

  abstract addEnrollment (studentInstance, enrollment)
}
