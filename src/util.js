import {
  DayOfWeek,
  LocalDate,
  Month,
} from "@js-joda/core"

export const createMonths = (year) => {
  let kw = getFirstKw(year)
  let months = Month.values()
  let result = []
  for (let month of months) {
    let weeks = createWeeks(kw, year, month)
    result.push({ month, weeks })
    let lastWeek = weeks[weeks.length - 1]
    kw = lastWeek.kw
    if (lastWeek.days[lastWeek.days.length - 1].day) {
      kw++
    }
  }
  return result
}

const createWeeks = (startKw, year, month) => {
  let result = []
  let daysInMonth = getDaysInMonth(year, month)
  let date = 1
  let kw = startKw
  while (true) {
    let days = []
    let daysOfWeek = DayOfWeek.values()
    let anyDaysInWeek = false
    for (let dayOfWeek of daysOfWeek) {
      if (daysInMonth.has(dayOfWeek.value() + "-" + date)) {
        days.push({ day: LocalDate.of(Number(year), month.value(), date) })
        date++
        anyDaysInWeek = true
      } else {
        days.push({})
      }
    }
    if (anyDaysInWeek) {
      result.push({ kw, days })
      kw++
    } else {
      return result
    }
  }
}

const getDaysInMonth = (year, month) => {
  let result = new Set()
  let d = LocalDate.of(Number(year), month.value(), 1)
  while (d.month() === month) {
    result.add(d.dayOfWeek().value() + "-" + d.dayOfMonth())
    d = d.plusDays(1)
  }
  return result
}

const getFirstKw = (year) => {
  let d = LocalDate.of(Number(year), Month.JANUARY, 1)
  switch (d.dayOfWeek()) {
    case DayOfWeek.FRIDAY:
    case DayOfWeek.SATURDAY:
    case DayOfWeek.SUNDAY:
      return 0
    default:
      return 1
  }
}
