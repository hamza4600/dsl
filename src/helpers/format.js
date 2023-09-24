import moment from 'moment';

export const FORMAT_PRICE = (value = 0) => {
  const priceRegEx = /(\d+)(\d{3})/;

  const x = value.toString().split('.');
  let whole = x[0];
  const decimal = x.length > 1 ? x[1].length < 2 ? x[1].padEnd(2, '0') : x[1].slice(0, 2) : '00';

  while (priceRegEx.test(whole)) {
    whole = whole.replace(priceRegEx, '$1' + ',' + '$2');
  }

  return `$${whole}.${decimal}`;
}

export const FORMAT_TIME = (start) => {
  const duration = moment.duration(moment().diff(moment(start)));

  //Get Days
  const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
  const daysFormatted = days ? `${days} days ` : ''; // if no full days then do not display it at all

  //Get Hours
  const hours = duration.hours();
  const hoursFormatted = `${hours} hours `;

  //Get Minutes
  // const minutes = duration.minutes();
  // const minutesFormatted = `${minutes} minutes`;

  // return [daysFormatted, hoursFormatted, minutesFormatted].join('');
  return [daysFormatted, hoursFormatted].join('');
}
