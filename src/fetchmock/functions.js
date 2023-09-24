// DEPENDENCIES
import _ from 'lodash';
import queryString from 'query-string';

// GLOBAL VARIABLES
import { ENVIRONMENTS, PATH } from 'globals.js';

// GLOBAL FUNCTIONS
import { getCodes } from 'codes.js';
import { formatDate, makePath } from 'functions.js';

// LOCAL VARIABLES
import { VEHICLE_MANAGEMENT } from './variables.js';

// VARIABLES
const API = makePath(ENVIRONMENTS.dev.url, PATH);
const SESSION_LENGTH = 21600000; // 6 hours
//const SESSION_LENGTH = 140000;   // 3 minutes


// URL

export const makeURL = (...parts) => `https:/${makePath(API, ...parts)}`;


// RESPONSES

export const response = body => ({
  status: 200,
  body
})

export const success = body => response({
  status: true,
  ...body
});

export const failure = body => response({
  status: false,
  ...body
});


// REQUEST DATA

export const urlParams = url => queryString.parse(url.split('?')[1]);
export const bodyParams = body => JSON.parse(body);


// RETURN DATA

export const tokenExp = () => new Date(new Date().getTime() + SESSION_LENGTH);

export const listData = (prototype, length) => {
  const result = [];
  for (let i = 0; i < length; i++) result.push(typeof prototype === 'function' ? prototype(i) : prototype);
  return result;
}

export const random = {
  number: (min = 0, max = 9) => _.random(min, max),
  letter: (len = 1) => _.times(len, () => _.random(10, 35).toString(36)).join('').toUpperCase(),
  alphanumeric: (len = 1) => _.times(len, () => _.random(35).toString(36)).join('').toUpperCase(),
  array: (array = []) => array[_.random(0, array.length - 1)],
  date: ({
    startDate,
    years = -3,
    months = -12,
    days = -30,
  }) => {
    const today = startDate ? new Date(startDate) : new Date();
    const year = today.getFullYear() + Math.ceil(years * Math.random());
    const month = today.getMonth() + Math.ceil(months * Math.random());
    const date = today.getDate() + Math.ceil(days * Math.random());
    return formatDate(new Date(year, month, date));
  },
  code: codes => getRandom(getCodes(codes)),
  first: () => getRandom(['John', 'Joe', 'Jane']),
  last: () => getRandom(['Rogers', 'Smith', 'White']),
  name: () => getRandom(['John Smith', 'Joe White', 'Jane Rogers']),
  vehicle: () => getRandom(['2022 BMW X7', '2021 Audi Q7', '2020 Hyundai Palisade']),
  tel: () => `+1 (${_.random(200, 999)}) ${_.random(200, 999)}-${_.random(1000, 9999)}`,
  select: values => getRandom(values),
}

export const getRandom = array => array[Math.floor(Math.random() * array.length)];

export const vehicleManagmentID = (type, allowNull) => {
  const array = VEHICLE_MANAGEMENT.map(o => o.vehicle_management_type === type ? o.vehicle_management_id : undefined).filter(id => !!id);
  if (allowNull) array.push('');
  return getRandom(array)
};
