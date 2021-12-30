export default abstract class DatabaseService {
  protected studentRepository

  constructor () {
    this.studentRepository = null
  }

  abstract initDatabase ()
}
