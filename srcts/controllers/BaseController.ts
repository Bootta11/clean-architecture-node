import to from 'await-to-js'
import { get, mapKeys } from 'lodash'
import constants from '../config/constants'

export class BaseController {
  async getResponseAndHandleError (asyncRequest, next): Promise<any> {
    const [error, response] = await to(asyncRequest)

    if (error !== undefined) next(error)

    return response
  }

  formatResponse (response, responseData: any, type: string = 'json'): void {
    const responseType = get(
      mapKeys(constants.responseTypes, (v, k) => String(k).toLowerCase()),
      type,
      constants.responseTypes.JSON
    )

    response.format({
      [responseType]: () => response.send(responseData)
    })
  }
}
