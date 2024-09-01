import {
  expect,
  test,
} from "vitest"
import {
  LocalDate,
} from "@js-joda/core"
import {
  createMonths,
} from "./util.js"

test("months", () => {
  let months = createMonths(2024)
  expect(months[8].weeks[0].days[6].day)
    .toStrictEqual(LocalDate.of(2024, 9, 1))
})
