export default (object, path) => {
  let subPath = path.split('.')
  let  pathLength = subPath.length

  for (let index = 0; index < pathLength; index++) {
    object = object[subPath[index]] || ''
  }
  return object
}
