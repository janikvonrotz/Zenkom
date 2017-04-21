export default (data, filename, state) => {
  // setup csv
  let keys = Object.keys(data[0])

  // add headers
  let csvContent = keys.map((key) => {
    return `"${ state.i18n.label[key] || state.i18n.vocabulary[key] }"`
  }).join(',') + '\n'

  // add rows
  data.map((object) => {
    csvContent += keys.map((key) => {
      return `"${object[key]}"`
    }).join(',') + '\n'
  })

  // export file
  let link = document.createElement('a')
  link.setAttribute('href', 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(csvContent))
  link.setAttribute('download', `${ filename }.csv`)
  document.body.appendChild(link)
  link.click()
}
