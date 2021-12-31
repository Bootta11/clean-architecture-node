import { asClass, Lifetime } from 'awilix'
import MainRouter from './MainRouter'
import StudentsRouter from './StudentsRouter'

export default {
  mainRouter: asClass(MainRouter, { lifetime: Lifetime.SINGLETON }),
  studentsRouter: asClass(StudentsRouter, { lifetime: Lifetime.SINGLETON })
}
