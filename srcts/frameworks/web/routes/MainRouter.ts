import { Router } from 'express'
import container from '../../../config/container'

class MainRouter {
  private readonly router

  constructor () {
    this.router = Router()
  }

  loadRoutes (): Router {
    this.router.use('/students', container.resolve('studentsRouter').routes())
    return this.router
  }
}

export default MainRouter
