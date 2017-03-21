import { config } from './index'

export default (action, roles) => {
  let allowed = false
  let allowedRoles = config.acl[action]
  roles.map((role) => {
    allowed = allowedRoles.indexOf(role) != -1 ? true : false
  })
  return allowed
}
