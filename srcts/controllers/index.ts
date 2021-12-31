import { asClass, Lifetime } from 'awilix'
import StudentController from './students/StudentController'

export default {
  studentController: asClass(StudentController, { lifetime: Lifetime.SINGLETON })
}
