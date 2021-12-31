import InMemoryDatabaseServices from '../frameworks/persistance/InMemory/InMemoryDatabaseServices'
import UniversityCrmServices from '../frameworks/externalServices/UniversityCrmServices'
import { StudentMap } from '../frameworks/data-mappers/StudentMap'
import container from './container'
import { asClass, Lifetime } from 'awilix'

container.register({
  databaseService: asClass(InMemoryDatabaseServices, { lifetime: Lifetime.SINGLETON }),
  crmService: asClass(UniversityCrmServices, { lifetime: Lifetime.SINGLETON }),
  studentMap: asClass(StudentMap, { lifetime: Lifetime.SINGLETON })
})

export default {
  DatabaseService: new InMemoryDatabaseServices(),
  CrmServices: new UniversityCrmServices(),
  mappers: {
    StudentMap: new StudentMap()
  }
}
