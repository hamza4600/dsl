import { formatPlural } from 'functions.js';

export const pluralFormat = (label, useZero, usePlural) => ({
  format: value => formatPlural(value, label),
  removeFormatting: formattedValue => formattedValue.replace(new RegExp(` ${label}(s)?`), ''),
  placeholder: `XX ${label}s`
})

export const NUMBER_FORMATS = {
  date: {
    format: '##/##/##',
    placeholder: 'mm/dd/yy',
    mask: ['m', 'm', 'd', 'd', 'y', 'y']
  },
  dateRange: {
    format: '##/##/## - ##/##/##',
    placeholder: 'mm/dd/yy - mm/dd/yy',
    mask: ['m', 'm', 'd', 'd', 'y', 'y', 'm', 'm', 'd', 'd', 'y', 'y']
  },
  miles: {
    thousandSeparator: true,
    decimalScale: 2,
    placeholder: 'X,XXX'
  },
  dollars: {
    prefix: '$ ',
    thousandSeparator: true,
    decimalScale: 2,
    fixedDecimalScale: true,
    placeholder: '$ X,XXX'
  },
  duration: {
    days: pluralFormat('day'),
    hours: pluralFormat('hour'),
  },
  emailHidden: {
    format: value => {
      const parts = value.split('@');
      parts[0] = parts[0].substring(0, 2) + '****';
      return parts.join('@');
    }
  },
  percent: {
    suffix: '%',
    decimalScale: 2,
    allowNegative: false,
    placeholder: 'XX%'
  },
  tel: {
    format: '+1 (###) ###-####',
    placeholder: '+1 (XXX) XXX-XXXX',
    mask: 'X',
    useFormattedValue: true
  },
  year: {
    format: '####',
    placeholder: 'XXXX',
    mask: 'X'
  }
}
