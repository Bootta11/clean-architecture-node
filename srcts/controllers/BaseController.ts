import to from 'await-to-js'
import { get, mapKeys } from 'lodash'
import constants from '../config/constants'

export class BaseController {
  async getResponseAndHandleError (asyncRequest, next): Promise<any> {
    const [error, response] = await to(asyncRequest)

    if (error !== undefined) next(error)

    return response
  }

  async formatResponse (response, responseData: any, type: string = 'json'): Promise<void> {
    const responseType = get(
      mapKeys(constants.responseTypes, (v, k) => String(k).toLowerCase()),
      type,
      constants.responseTypes.JSON
    )

    return response.format({
      [responseType]: () => response.send(responseData)
    })
  }
}
