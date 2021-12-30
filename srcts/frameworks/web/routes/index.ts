import { Router } from 'express'
import studentsRouter from './StudentsRouter'

class ApiRouter {
  private readonly router

  constructor () {
    this.router = Router()
  }

  loadRoutes (dependencies): Router {
    this.router.use('/students', studentsRouter.routes(dependencies))
    return this.router
  }
}

export const apiRouter = new ApiRouter()
export default apiRouter
