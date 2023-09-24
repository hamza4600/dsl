// DEPENDENCIES
import _ from 'lodash';
import queryString from 'query-string';
import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import isBefore from 'date-fns/isBefore';

// REDUX
import { store } from 'store.js';
import { alertActions, modalActions, sessionActions } from 'actions.js';

// GLOBAL VARIABLES
import { ENDPOINTS } from 'endpoints.js';
import { FETCH, DATE, LOGOUT } from 'defaults.js';
import { DEBUG, ENVIRONMENTS, MODAL_PRIORITY, PATH } from 'globals.js';


// Utility

export const bugLog = (feedback, debug = DEBUG, name, value) => {
  if (name) feedback = `[${name}] ${feedback}`;
  if (value !== undefined) feedback = `${feedback}: ${value}`;
  if (debug) console.log(feedback);
}

export const doCallback = (callback, ...rest) => {
  if (callback === undefined) return;
  if (_.isFunction(callback)) return callback(...rest);
}

export const randomID = () => Math.random().toString(36).substring(2, 15).toUpperCase();

export const controlName = (name, ...parents) => [...parents, name].filter(p => p !== undefined && p !== null && p !== '').join('.').toLowerCase()

export const arrayToCSV = (array, separator = ',') => array.filter(el => el !== '').join(separator);

export const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};


// API

export const getEnv = key => {
  let val = ENVIRONMENTS.dev[key];
  Object.keys(ENVIRONMENTS).forEach(env => {
    if (window.location.hostname === ENVIRONMENTS[env].hostname) val = ENVIRONMENTS[env][key];
  })
  return val;
}

export const getURL = () => `${getEnv('url')}`;

export const getKey = () => getEnv('key');

export const getEndpoint = (endpoint, prop) => typeof endpoint === 'function' ? !prop ? undefined : endpoint(prop) : endpoint;

export const stringifyBody = (values, stringify, blacklist = []) => {
  if (Array.isArray(values)) {
    return FETCH.useCSV ? values.join(',') : values;
  } else if (typeof values === 'object') {
    _.keys(values).forEach(key => {
      if (blacklist.includes(key)) delete values[key];
      else values[key] = stringifyBody(values[key]);
    })
    return stringify ? JSON.stringify(values) : values;
  } else {
    return values;
  }
}

export const apiFetch = ({
  method = 'GET',
  path = PATH,
  endpoint,
  headers = {},
  body,
  params,
  useQueryString,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  onComplete,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions = modalFunctions,
  debugOnly,
  debug = debugOnly,
}) => {

  let fetchLog = feedback => bugLog(feedback, debug);

  if (!endpoint) {
    doCallback(onError);
    return console.error('No endpoint specified!');
  }

  let url = 'https:/' + makePath(getURL(), path, endpoint);
  const { token } = store.getState();

  let config = {};
  config.method = method;
  config.headers = Object.assign({
    'Content-Type': 'application/json',
    'x-api-key': getKey()
  }, headers);
  config.credentials = 'include';
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (body) config.body = body;
  if (params) {
    if (method === 'GET' || useQueryString) url += '?' + queryString.stringify(params);
    else config.body = stringifyBody(params, true, FETCH.blacklist)
  };

  if (params) fetchLog(params);

  fetchLog(url);
  fetchLog(config);

  if (debugOnly) return;

  const clearLoadingMessage = loadingMessage ? messageFunctions.loading(loadingMessage) : undefined;
  doCallback(onFetch);

  fetch(url, config)
    .then((response) => {

      fetchLog(response);

      doCallback(clearLoadingMessage);
      doCallback(onResponse, response);

      if (!response.ok) {
        throw Error(response);
      } else {
        return response;
      }
    })
    .then(response => response.json())
    .then((data) => {

      fetchLog(data);

      if (data.status === false || data?.success === false) {
        messageFunctions.error(data.ERROR || data.error || data.message || errorMessage);
        doCallback(onError, data);
      } else {
        messageFunctions.success(successMessage);
        doCallback(onSuccess, data);
      }
    })
    .catch((response) => {

      console.error(response);

      messageFunctions.error(errorMessage);
      doCallback(clearLoadingMessage);
      doCallback(onError);
    })
    .finally(() => {
      doCallback(onComplete)
    })
}

export const documentFetch = async ({
  path = PATH,
  endpoint,
  accept,
  contentType,
  mimeType = '',
  params,
  onFetch,
  onResponse,
  onSuccess,
  onError,
  onComplete,
  loadingMessage,
  successMessage,
  errorMessage,
  messageFunctions = modalFunctions,
  debugOnly,
  debug = debugOnly
}) => {
  const fetchLog = feedback => bugLog(feedback, debug);

  if (!endpoint) {
    doCallback(onError);
    return console.error('No endpoint specified!');
  }

  let url = 'https:/' + makePath(getURL(), path, endpoint);
  if (params) {
    url += '?' + queryString.stringify(params);
    fetchLog(params);
  }
  fetchLog(url);

  const config = {
    method: 'GET',
    headers: {
      Accept: accept,
      'Content-Type': contentType,
      'x-api-key': getKey()
    },
    credentials: 'include'
  };
  const { token } = store.getState();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  fetchLog(config);

  if (debugOnly) return;

  const clearLoadingMessage = loadingMessage ? messageFunctions.loading(loadingMessage) : undefined;
  doCallback(onFetch);

  try {
    const response = await fetch(url, config);

    fetchLog(response);

    doCallback(onResponse, response);

    if (!response.ok) throw Error(response);

    const buffer = await response.arrayBuffer();

    const blob = new Blob([buffer], { type: mimeType.mime || mimeType });
    const documentUrl = window.URL.createObjectURL(blob);
    fetchLog(documentUrl);

    doCallback(clearLoadingMessage);
    messageFunctions.success(successMessage);
    doCallback(onSuccess, documentUrl);
  } catch (error) {
    console.error(error);

    messageFunctions.error(errorMessage);
    doCallback(clearLoadingMessage);
    doCallback(onError);
  } finally {
    doCallback(onComplete);
  }
};


// Session

export const timeExpired = timeStamp => {
  if (!timeStamp) return false;

  const nowUtc = utcToZonedTime(new Date(), 'UTC');
  const expUtc = utcToZonedTime(new Date(timeStamp), 'UTC');

  return isBefore(expUtc, nowUtc);
};

export const loggedIn = (token, tokenExp) => token && !timeExpired(tokenExp);

export const logOut = (payload, useFetch = LOGOUT.useFetch) => {

  const LOGOUT_ALERT = {
    type: 'loading',
    message: 'Logging out',
    priority: MODAL_PRIORITY.override
  }

  const dispatchLogout = () => store.dispatch(sessionActions.logout(payload))

  if (useFetch) {

    const args = {
      method: 'GET',
      endpoint: ENDPOINTS.session.logout,
      onResponse: modalFunctions.add(LOGOUT_ALERT),
      onSuccess: dispatchLogout,
      errorMessage: 'Unable to sign out.'
    }

    apiFetch(args);
  } else {
    dispatchLogout();
  }
}


// Router

export const makePath = (...parts) => _.replace(`/${_.filter(parts, p => !!p).map(p => _.trim(p, '/')).join('/')}/`, '//', '/');

// Alerts / Modals

const addAlert = alert => {
  if (!alert || !alert.message) return;
  alert.ID = randomID();
  store.dispatch(alertActions.add(alert));
  return () => store.dispatch(alertActions.remove(alert.ID));
}

export const alertFunctions = {
  add:     addAlert,
  remove:  alertID => store.dispatch(alertActions.remove(alertID)),
  clear:   alerts  => store.dispatch(alertActions.clear(alerts)),
  message: message => addAlert({ message, variant: 'secondary' }),
  success: message => addAlert({ message, variant: 'success' }),
  warning: message => addAlert({ message, variant: 'warning' }),
  danger:  message => addAlert({ message, variant: 'danger' }),
  info:    message => addAlert({ message, variant: 'info' }),
  error:   message => addAlert({ message, variant: 'danger' }),
  loading: message => addAlert({ message, type: 'loading' })
}

const addModal = modal => {
  if (!modal) return;
  modal.ID = randomID();
  if (modal.priority === undefined) modal.priority = MODAL_PRIORITY.default;
  store.dispatch(modalActions.add(modal));
  return () => store.dispatch(modalActions.remove(modal.ID));
}

export const modalFunctions = {
  add:        addModal,
  remove:     modalID => store.dispatch(modalActions.remove(modalID)),
  increment:  ()      => store.dispatch(modalActions.increment()),
  clear:      ()      => store.dispatch(modalActions.clear()),
  message:    message => !message ? null : addModal({ message, type: 'alert', variant: 'secondary' }),
  success:    message => !message ? null : addModal({ message, type: 'alert', variant: 'success' }),
  warning:    message => !message ? null : addModal({ message, type: 'alert', variant: 'warning' }),
  danger:     message => !message ? null : addModal({ message, type: 'alert', variant: 'danger' }),
  info:       message => !message ? null : addModal({ message, type: 'alert', variant: 'info' }),
  error:      message => !message ? null : addModal({ message, type: 'alert', variant: 'danger'}),
  loading:    message => !message ? null : addModal({ message, type: 'loading', priority: MODAL_PRIORITY.low })
}


// Numbers / Date / Time

export const precedingZero = (num) => {
  let numString = num.toString();
  if (numString.length === 1)
    numString = '0' + numString;
  return numString;
}

export const toNumber = (num) => {
  return isNaN(num) ? 0 : num;
}

export const formatPlural = (value = 0, unit, usePrecedingZero = DATE.usePrecedingZero, usePlural = true) => {
  const float = parseFloat(value);
  if (isNaN(float)) return '';
  if (float === 0 && !usePrecedingZero) return '';
  return `${float} ${unit}${parseFloat(float) !== 1 && usePlural ? 's' : ''}`;
};

export const compare = (value, operator, operand) => {
  switch (operator) {
    case '===':
      return value === operand;
    case '>':
      return value > operand;
    case '<':
      return value < operand;
    case '>=':
      return value >= operand;
    case '<=':
      return value <= operand;
    default:
      return undefined;
  }
}

export const getMidnight = (date) => {
  date = date instanceof Date ? date : new Date(date);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export const safeDate = date => {
  const dateObject = new Date(date);
  return isNaN(dateObject.getTime()) ? '' : dateObject;
}

export const compareDate = (value, operator, operand) => {
  value = getMidnight(value).getTime();
  operand = getMidnight(operand).getTime();

  if (typeof operator === 'undefined') // If no operator is defined, just check that value is a valid date.
    return !isNaN(value);

  if (isNaN(value) && isNaN(operand)) // Else, first check that dates are valid.
    throw Error;

  return compare(value, operator, operand); // Return comparison;
}

export const formatDate = (value, yearLength = DATE.yearLength, usePrecedingZero = DATE.usePrecedingZero, separator = '/') => {
  const date = value instanceof Date ? value : new Date(value);
  let month = date.getMonth() + 1;
  if (usePrecedingZero) month = precedingZero(month);
  let day = date.getDate();
  if (usePrecedingZero) day = precedingZero(day);
  let year = date.getFullYear().toString().substring((4 - yearLength), 4);
  return value && `${month}${separator}${day}${separator}${year}`;
}

export const formateName =(str,splt="  ") =>{
  const v = str.split(splt)
  return v
}

export const dollarsToNumber = value =>  +value.replace(/\$|,/g, '');
