import { config } from './index'

export default (action, roles) => {
  let allowed = false
  let allowedRoles = config.acl[action]
  roles = roles != null ? roles : []
  roles.map((role) => {
    allowed = allowedRoles.indexOf(role) != -1
  })
  allowed = config.disableAccessContol ? true : allowed
  return allowed
}
