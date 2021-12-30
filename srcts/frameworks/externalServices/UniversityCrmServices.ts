import CrmServices from '../../application/contracts/CrmServices'

export default class UniversityCrmServices extends CrmServices {
  async notify (studentDetails): Promise<any> {
    return await Promise.resolve('external crm system was notified')
  }
}
