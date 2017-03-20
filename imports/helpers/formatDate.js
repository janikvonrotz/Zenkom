import moment from 'moment'

export default (locale, date, format) => {
  moment.locale(locale)
  return moment(date).format(format || 'LLLL')
}
