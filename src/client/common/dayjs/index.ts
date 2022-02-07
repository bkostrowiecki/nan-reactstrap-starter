import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeData from 'dayjs/plugin/localeData'
// import locale from 'dayjs/locale/pl'

dayjs.extend(relativeTime)

// Initialize locale here
// dayjs.locale(locale)
dayjs.extend(localeData)

export {
  dayjs
}
