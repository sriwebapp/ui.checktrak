import moment from 'moment'

export default class Helper {
  static formatCurrency(arg) {
    if (!arg) return
    return arg.replace(/,/g, '')
  }

  static formatDate(date, format) {
    if (!Date.parse(date)) {
      return null
    }

    date = moment(new Date(date))

    return date.format(format)
  }
}
