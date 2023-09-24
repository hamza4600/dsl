// SESSION

export const sessionActions = {
  login: (response) => ({
    type: "LOGIN_USER",
    ...response,
  }),
  logout: (payload) => ({
    type: "LOGOUT_USER",
    payload,
  }),
  extendSession: (response) => ({
    type: "EXTEND_SESSION",
    ...response,
  }),
  setVerification: (response) => ({
    type: "SET_VERIFICATION",
    verified: true,
  }),
  setStore: (response) => ({
    type: "SET_STORE",
    ...response,
  }),
  setCsrfTokens: (crsfTokens) => ({
    type: "SET_CSRF_TOKENS",
    crsfTokens,
  }),
  clearCsrfTokens: () => ({
    type: "CLEAR_CSRF_TOKENS",
  }),
};

export const configurationActions = {
  setConfiguration: (response) => ({
    type: "SET_CONFIGURATION",
    configuration: response,
  }),
  clearConfiguration: (response) => ({
    type: "CLEAR_CONFIGURATION",
    configuration: response,
  }),
};

// INTERFACE

export const setScreenSize = ({isMobile, isTab}) => {
  return({
  type: "SET_SCREEN_SIZE",
  isMobile, isTab
})};

export const alertActions = {
  add: (alerts) => ({
    type: "ADD_ALERTS",
    alerts: Array.isArray(alerts) ? alerts : [alerts],
  }),
  remove: (alertID) => ({
    type: "REMOVE_ALERT",
    alertID,
  }),
  clear: (alerts) => ({
    type: "CLEAR_ALERTS",
    alerts: alerts,
  }),
};

export const modalActions = {
  add: (modal) => ({
    type: "ADD_MODAL",
    modal,
  }),
  remove: (modalID) => ({
    type: "REMOVE_MODAL",
    modalID,
  }),
  increment: () => ({
    type: "INCREMENT_MODAL",
  }),
  clear: () => ({
    type: "CLEAR_MODALS",
  }),
};

export const sidebarActions = {
  toggle: (sidebarName, toggleState) => ({
    type: 'TOGGLE_SIDEBAR',
    sidebarName,
    toggleState
  }),
  close: () => ({
    type: 'TOGGLE_SIDEBAR'
  })
}

// DATA/SETTINGS

export const preferenceActions = {
  setPreference: (key, setting) => ({
    type: "SET_PREFERENCE",
    key,
    setting
  }),
  updatePreference: (key, setting) => ({
    type: "UPDATE_PREFERENCE",
    key,
    setting
  }),
  clearPreference: key => ({
    type: "CLEAR_PREFERENCE",
    key
  })
}

export const lookupActions = {
  init: (key) => ({
    type: "INIT_LOOKUP",
    key,
  }),
  load: (key, payload = []) => ({
    type: "LOAD_LOOKUP",
    key,
    payload,
  }),
  error: (key) => ({
    type: "LOOKUP_ERROR",
    key,
  }),
  flush: (key) => ({
    type: "FLUSH_LOOKUP",
    key,
  }),
};
