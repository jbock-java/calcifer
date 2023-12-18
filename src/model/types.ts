import { Month } from "@js-joda/core";

export interface Week {
    kw: number;
    days: string[];
}

export interface DataMonth {
    month: Month;
    weeks: Week[];
}
