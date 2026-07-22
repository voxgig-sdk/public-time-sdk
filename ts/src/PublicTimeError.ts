
import { Context } from './Context'


class PublicTimeError extends Error {

  isPublicTimeError = true

  sdk = 'PublicTime'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PublicTimeError
}

