/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  addDays,
  addMonths,
  addYears,
  format as formatDate,
  getDate,
  getDay,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getWeek,
  getYear,
  isAfter,
  isValid,
  parse as parseDate,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setSeconds,
  setYear,
} from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { GenerateConfig } from 'rc-picker/lib/generate';

const localeParse = (format: string) => {
  return format
    .replace(/Y/g, 'y')
    .replace(/D/g, 'd')
    .replace(/gggg/, 'yyyy')
    .replace(/g/g, 'G')
    .replace(/([Ww])o/g, 'wo');
};

export const pickersConfig: GenerateConfig<Date> = {
  // get
  getNow: () => new Date(),
  getWeekDay: date => getDay(date),
  getYear: date => getYear(date),
  getMonth: date => getMonth(date),
  getDate: date => getDate(date),
  getHour: date => getHours(date),
  getMinute: date => getMinutes(date),
  getSecond: date => getSeconds(date),

  // set
  addYear: (date, diff) => addYears(date, diff),
  addMonth: (date, diff) => addMonths(date, diff),
  addDate: (date, diff) => addDays(date, diff),
  setYear: (date, year) => setYear(date, year),
  setMonth: (date, month) => setMonth(date, month),
  setDate: (date, num) => setDate(date, num),
  setHour: (date, hour) => setHours(date, hour),
  setMinute: (date, minute) => setMinutes(date, minute),
  setSecond: (date, second) => setSeconds(date, second),

  // Compare
  isAfter: (date1, date2) => isAfter(date1, date2),
  isValidate: date => isValid(date),

  locale: {
    getWeekFirstDay: () => {
      return enUS.options!.weekStartsOn!;
    },
    getWeek: (locale, date) => {
      return getWeek(date, { locale: enUS });
    },
    getShortWeekDays: () => {
      return Array.from({ length: 7 }).map((_, i) => enUS.localize!.day(i, { width: 'short' }));
    },
    getShortMonths: () => {
      return Array.from({ length: 12 }).map((_, i) => enUS.localize!.month(i, { width: 'abbreviated' }));
    },
    format: (_, date, format) => {
      if (!isValid(date)) {
        return '';
      }
      return formatDate(date, localeParse(format), {
        locale: enUS,
      });
    },
    parse: (_, text, formats) => {
      for (let i = 0; i < formats.length; i += 1) {
        const format = localeParse(formats[i]);
        const formatText = text;
        const date = parseDate(formatText, format, new Date(), {
          locale: enUS,
        });
        if (isValid(date)) {
          return date;
        }
      }
      return null;
    },
  },
};
