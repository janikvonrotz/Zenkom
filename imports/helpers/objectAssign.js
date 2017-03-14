
export default (obj1, obj2, obj3) => {
    let obj = {}
    for (let attrname in obj1) {
      obj[attrname] = obj1[attrname]
    }
    for (let attrname in obj2) {
      obj[attrname] = obj2[attrname]
    }
    for (let attrname in obj3) {
      obj[attrname] = obj3[attrname]
    }

    return obj
}
