import to from 'await-to-js'

export class BaseController {
  async getResponseAndHandleError (asyncRequest, next): Promise<any> {
    const [error, response] = await to(asyncRequest)

    if (error !== undefined) next(error)

    return response
  }
}
