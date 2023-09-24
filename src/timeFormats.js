export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const TODAY = new Date();

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const THIS_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);

export const ALL_TIME = new Date(new Date().getFullYear() - 2, 0, 1)

export const DATE_RANGES = {
  custom: {
    label: 'Custom'
  },
  today: {
    label: 'Today',
    startDate: TODAY,
    endDate:   TODAY
  },
  thisWeek: {
    label: 'This Week',
    startDate: new Date(TODAY).setDate(TODAY.getDate() - TODAY.getDay()),
    endDate:   TODAY
  },
  lastWeek: {
    label: 'Last Week',
    startDate: new Date(TODAY).setDate(TODAY.getDate() - TODAY.getDay() - 7),
    endDate:   new Date(TODAY).setDate(TODAY.getDate() - TODAY.getDay() - 1)
  },
  thisMonth: {
    label: 'This Month',
    startDate: new Date(TODAY).setDate(1),
    endDate:   TODAY
  },
  lastMonth: {
    label: 'Last Month',
    startDate: new Date(new Date(TODAY).setMonth(TODAY.getMonth() - 1)).setDate(1),
    endDate:   new Date(TODAY).setDate(0)
  },
  thisQuarter: {
    label: 'This Quarter',
    startDate: new Date(new Date(TODAY).setMonth(Math.floor(TODAY.getMonth()/3) * 3)).setDate(1),
    endDate:   TODAY
  },
  lastQuarter: {
    label: 'Last Quarter',
    startDate: new Date(new Date(TODAY).setMonth(Math.floor(TODAY.getMonth()/3) * 3 - 3)).setDate(1),
    endDate:   new Date(new Date(TODAY).setMonth(Math.floor(TODAY.getMonth()/3) * 3)).setDate(0)
  },
  thisYear: {
    label: 'This Year',
    startDate: new Date(TODAY.getFullYear(), 0, 1),
    endDate:   TODAY
  },
  lastYear: {
    label: 'Last Year',
    startDate: new Date(TODAY.getFullYear() - 1, 0, 1),
    endDate: new Date(TODAY.getFullYear() - 1, 11, 31)
  }
}
