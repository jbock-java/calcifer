import {
  LocalDate,
} from "@js-joda/core"

export function getHighlight(year, highlight) {
  let result = {}
  for (let token of highlight) {
    let color = getColor(token)
    let [von, bis] = token.split("_")
    result[year + "-" + von.substring(0, 5)] = color
    if (bis) {
      let d = LocalDate.parse(year + "-" + von.substring(0, 5)).plusDays(1)
      let b = LocalDate.parse(year + "-" + bis.substring(0, 5))
      while (!d.isAfter(b)) {
        result[d.toString()] = color
        d = d.plusDays(1)
      }
    }
  }
  return result
}

function getColor(token) {
  if (token.length === 6) {
    return token.substring(5, 6)
  }
  if (token.length === 12) {
    return token.substring(11, 12)
  }
  return "s"
}
