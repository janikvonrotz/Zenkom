import moment from 'moment'

export default (locale, date) => {
  moment().locale(locale)
  return moment(date).fromNow()
}
