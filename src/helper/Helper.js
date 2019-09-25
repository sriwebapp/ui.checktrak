export default class Helper {
  static formatCurrency(arg) {
    return arg.replace(/,/g, '')
  }

  static formatDate(date, format) {
    if (!Date.parse(date)) {
      return null
    }

    date = new Date(date)

    const day = date
      .getDate()
      .toString()
      .padStart(2, 0)
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const year = date.getFullYear()

    if (format === 'm/d/y') {
      return month + '/' + day + '/' + year
    } else if (format === 'y-m-d') {
      return year + '-' + month + '-' + day
    } else {
      return null
    }
  }
}
