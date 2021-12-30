import StudentController from '../../../controllers/students/StudentController'
import { Router } from 'express'
import bindAll from 'bind-all'

class StudentsRouter {
  routes (dependencies): Router {
    const router = Router()
    console.log(dependencies)
    const controller = bindAll(new StudentController(dependencies))

    router.route('/')
      .get(controller.getAllStudents)
      .post(controller.addNewStudent)

    router.route('/:studentId')
      .get(controller.getStudent)

    router.route('/enrollment/:studentId')
      .post(controller.addEnrollment)

    return router
  }
}

export default new StudentsRouter()
