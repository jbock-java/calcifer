import {
  expect,
  test,
} from "vitest"
import {
  LocalDate,
  Month,
} from "@js-joda/core"
import {
  createMonths,
  createWeeks,
} from "./util.js"

test("months", () => {
  let months = createMonths(2024)
  expect(months[8].weeks[0].days[6].day)
    .toStrictEqual(LocalDate.of(2024, 9, 1))
})

test("weeks", () => {
  let weeks = createWeeks(35, 2024, Month.SEPTEMBER)
  expect(weeks[0].days[6].day)
    .toStrictEqual(LocalDate.of(2024, 9, 1))
})
