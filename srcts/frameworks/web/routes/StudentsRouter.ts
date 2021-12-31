import { Router } from 'express'
import bindAll from 'bind-all'
import container from '../../../config/container'

export default class StudentsRouter {
  routes (): Router {
    const router = Router()
    const controller = bindAll(container.resolve('studentController'))

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
