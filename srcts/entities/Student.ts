export default class Student {
  public id
  public firstName
  public lastName
  public fullName
  public email
  public enrollments

  constructor (firstName, lastName, email, enrollments?) {
    this.id = null
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = `${String(firstName)} ${String(lastName)}`
    this.email = email
    this.enrollments = enrollments
  }
}
