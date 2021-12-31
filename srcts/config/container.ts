import { createContainer, InjectionMode } from 'awilix'
import controllers from '../controllers'
import routes from '../frameworks/web/routes'

export const container = createContainer({
  injectionMode: InjectionMode.PROXY
})

container.register(routes)

container.register(controllers)

export default container
