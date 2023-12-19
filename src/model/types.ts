import { LocalDate, Month } from "@js-joda/core";

export interface DataDay {
    day?: LocalDate;
}

export interface Week {
    kw: number;
    days: DataDay[];
}

export interface DataMonth {
    month: Month;
    weeks: Week[];
}
