import permission from './permission.js'
import globalResolvers from './globalResolvers.js'
import auth from './auth.js'
import branch from './branch.js'
import transport from './transport.js'
import staff from './staff.js'
import other from './other.js'

export default [
    globalResolvers,
    auth,
    permission,
    branch,
    transport,
    staff,
    other
]