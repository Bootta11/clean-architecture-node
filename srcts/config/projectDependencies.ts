import InMemoryDatabaseServices from '../frameworks/persistance/InMemory/InMemoryDatabaseServices'
import UniversityCrmServices from '../frameworks/externalServices/UniversityCrmServices'
import { StudentMap } from '../frameworks/data-mappers/StudentMap'

export default {
  DatabaseService: new InMemoryDatabaseServices(),
  CrmServices: new UniversityCrmServices(),
  mappers: {
    StudentMap: new StudentMap()
  }
}
