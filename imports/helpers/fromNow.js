import moment from 'moment'

export default (locale, date) => {
  moment.locale('de')
  return moment(date).fromNow()
}
