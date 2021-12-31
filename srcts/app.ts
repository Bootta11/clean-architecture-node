import express from 'express'
import bodyParser from 'body-parser'
import projectDependencies from './config/projectDependencies'
import errorHandler from './frameworks/common/ErrorHandler'
import container from './config/container'

class App {
  private readonly app
  private readonly port

  constructor () {
    this.app = express()
    this.port = process.env.PORT === undefined ? 3000 : process.env.PORT
  }

  start (): any {
    projectDependencies.DatabaseService.initDatabase().then(() => {
      // load middlewares
      this.app.use(bodyParser.urlencoded({ extended: true }))
      this.app.use(bodyParser.json())

      // load routes
      this.app.use('/api', container.resolve('mainRouter').loadRoutes())

      // generic error handler
      this.app.use(errorHandler.handle)

      // create request scope
      this.app.use((req) => {
        // create request scope
        req.scope = container.createScope()
      })

      // eslint-disable-next-line arrow-body-style
      this.app.listen(this.port, () => console.log(`http://localhost:${String(this.port)}`))
    }, (err) => {
      console.log(`db is not ready, error:${String(err)}`)
    })
  }
}

const app = new App()
app.start()
